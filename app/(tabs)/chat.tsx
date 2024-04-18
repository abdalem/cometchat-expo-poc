import { StyleSheet } from 'react-native';
import { useChatContext } from '@/providers/ChatProvider';
import { ChannelList } from 'stream-chat-expo';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';

export default function TabTwoScreen() {
  const { userIsReadyToChat, userId, handleLogin, handleLogout } = useChatContext();

  React.useEffect(() => {
    handleLogin();

    return handleLogout();
  }, [])

  const filters = React.useMemo(() => ({
    members: {
      $in: [userId],
    }
  }), [userId])

  return (
    <View style={styles.container}>
      {userIsReadyToChat && userId && (
        // <ChannelList
        //   filters={{
        //     members: {
        //       $in: [userId],
        //     }
        //   }} 
        //   sort={{
        //     last_message_at: -1,
        //   }}
        // />
        <Text>User is ready</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
