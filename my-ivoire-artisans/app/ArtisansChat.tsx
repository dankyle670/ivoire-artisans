import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { darkGreen, white, lightGray } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Message {
  _id: string;
  message: string;
  senderId: string;
  receiverRole: string;
  sentAt: string;
}

const ArtisansChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [userId, setUserId] = useState<string>('');

  const fetchMessages = async () => {
    try {
      if (userId) {
        const response = await axios.get('https://ivoire-artisans-server.netlify.app/api/getMessages', {
          params: { userId },
        });

        if (response.data.messages) {
          const uniqueMessages = Array.from(
            new Map(response.data.messages.map(msg => [msg._id, msg])).values()
          ).map(msg => ({
            ...msg,
            message: msg.message,   // Ensure backend 'message' field is used
            timestamp: msg.sentAt,  // Map 'sentAt' to 'timestamp'
            user: msg.senderId === userId ? 'admin' : 'user',  // Determine message sender
          }));
          setMessages(uniqueMessages);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 100);

    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const fetchUserRoleAndId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        try {
          const response = await axios.get('https://ivoire-artisans-server.netlify.app/api/getRole', {
            params: { userId: storedUserId },
          });
          setRole(response.data.role);
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    };

    fetchUserRoleAndId();

    // Reset message count when the component mounts
    AsyncStorage.setItem('messageCount', '0');
  }, []);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !userId) return;
  
    try {
      await axios.post('https://ivoire-artisans-server.netlify.app/api/sendMessage', {
        userId,
        message: messageText,
      });
  
      setMessageText('');
      fetchMessages();
  
      // Only increment message count for admin
      if (role === 'admin') {
        const currentCount = await AsyncStorage.getItem('messageCount');
        const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
        await AsyncStorage.setItem('messageCount', newCount.toString());
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.senderId === 'admin' && styles.adminMessage]}>
      <Text style={[styles.messageText, item.senderId === 'admin' && styles.adminMessageText]}>
        {item.message} {/* Ensure 'message' field is displayed */}
      </Text>
      <Text style={[styles.timestamp, item.senderId === 'admin' && styles.adminTimestamp]}>
        {item.sentAt ? new Date(item.sentAt).toLocaleString() : 'No date available'}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Artisan Chat</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Each message has a unique ID
        contentContainerStyle={styles.messagesList}
      />

      {role === 'admin' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type your message..."
            placeholderTextColor={'black'}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <FontAwesome5 name="paper-plane" size={24} color={white} />
          </TouchableOpacity>
        </View>
      )}

      {role === 'user' && messages.some((msg) => msg.user === 'admin') && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>New message from Admin!</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  header: {
    backgroundColor: darkGreen,
    paddingVertical: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: white,
    top: 10,
  },
  messagesList: {
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  adminMessage: {
    backgroundColor: darkGreen,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  adminMessageText: {
    color: white,
  },
  timestamp: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  adminTimestamp: {
    color: white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: darkGreen,
    padding: 12,
    borderRadius: 25,
  },
  notification: {
    backgroundColor: darkGreen,
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
  },
  notificationText: {
    color: white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArtisansChat;
