// useChatClient.js

import React from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';

const CHAT_API_KEY = 'fz7q3t2w9nf6';
const CHAT_USER_ID = 'autumn-glitter-4';
const CHAT_USER_NAME = 'autumn-glitter-4';
const CHAT_USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYXV0dW1uLWdsaXR0ZXItNCJ9.pgdoXAULF4zPYMOPDTxcYPctrFdle5vG2DUvFH1eo6I';

const user = {
  id: CHAT_USER_ID,
  name: CHAT_USER_NAME,
};

export const client = StreamChat.getInstance(CHAT_API_KEY);

type ChatSession = {
  userIsReadyToChat: boolean;
  userId?: string;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
}

export const ChatContext = React.createContext<ChatSession | null>(null);

export const ChatProvider: React.FC<React.PropsWithChildren> = ({ children })  => {
  const [userIsReadyToChat, setUserIsReadyToChat] = React.useState(false);


  const handleLogin = async () => {
    try {
      if(!client.userID) {
        console.log(user.id)
        await client.connectUser({id: CHAT_USER_ID}, CHAT_USER_TOKEN);
        setUserIsReadyToChat(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`An error occurred while connecting the user: ${error.message}`);
      }
    }
  }

  const handleLogout = () => {
    try {
      if(client.userID) {
        client.disconnectUser();
        setUserIsReadyToChat(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`An error occurred while disconnecting the user: ${error.message}`);
      }
    }
  }

  return (
    <ChatContext.Provider value={{ userIsReadyToChat, userId: client.userID, handleLogin, handleLogout }}>
      {/* <OverlayProvider> */}
        {/* <Chat client={client}> */}
          {children}
        {/* </Chat> */}
      {/* </OverlayProvider> */}
    </ChatContext.Provider>
  )
};

export const useChatContext = () => {
  const context = React.useContext(ChatContext);

  if (!context) throw new Error('useChatContext must be used within a ChatProvider');

  return context;
}
