import React from "react";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { CometChatUIKit } from "@cometchat/chat-uikit-react-native";
import { Text, View } from '@/components/Themed';

const APP_ID = process.env.EXPO_PUBLIC_APP_ID;
const AUTH_KEY = process.env.EXPO_PUBLIC_AUTH_KEY;
const REGION = process.env.EXPO_PUBLIC_REGION;
const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

type Props = React.PropsWithChildren<{

}>;

const ChatProvider = ({children}: Props) => {
  const [user, setUser] = React.useState<CometChat.User>();

  const login = async () => {
    const user = await CometChat.login(USER_ID, AUTH_KEY)
    setUser(user);
  }

  React.useEffect(() => {
    const initializeCommetChat = async () => {
      try {
        await CometChat.init(APP_ID, new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(REGION)
          .autoEstablishSocketConnection(true)
          .build()
        )
        await CometChatUIKit.init({
          appId: APP_ID,
          authKey: AUTH_KEY,
          region: REGION,
        })
        await login();
      } catch (error: any) {
        console.error(`An error occurred while connecting the user: ${'message' in error ? error.message : error}`);
      }
    }

    initializeCommetChat();
  }, [])

  if (!user) return <Text>User loading</Text>
  
  return <Text>{user.getName()}</Text>;
}

export default ChatProvider