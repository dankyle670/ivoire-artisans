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
    }, 5000);

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
            placeholderTextColor={lightGray}
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
    backgroundColor: '#f1f1f1',
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
    color: lightGray,
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
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
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







//
//import React, { useState, useEffect } from 'react';
//import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons';
//import { darkGreen, white, lightGray } from './Constants';
//
//// Message interface for chat messages
//interface Message {
//  id: string;
//  text: string;
//  user: string; // 'admin' or artisan's name
//  timestamp: string;
//}
//
//const ArtisansChat: React.FC = () => {
//  const [messages, setMessages] = useState<Message[]>([
//    { id: '1', text: 'Welcome to the Artisan Chat. Here you can see updates and ask questions!', user: 'admin', timestamp: '10:00 AM' },
//    { id: '2', text: 'How can I update my subscription?', user: 'artisan', timestamp: '10:05 AM' },
//  ]);
//  const [messageText, setMessageText] = useState<string>(''); // Current message input
//  const [userRole, setUserRole] = useState<'admin' | 'artisan' | null>(null); // User role state
//
//  // Function to fetch user data and check role
//  const fetchUserRole = async () => {
//    try {
//      const token = await AsyncStorage.getItem('userToken'); // Replace with your token retrieval method
//      if (!token) return; // If no token is found, exit
//
//      const response = await fetch('https://yourapi.com/api/profile', {
//        method: 'GET',
//        headers: {
//          'Authorization': `Bearer ${token}`,
//        },
//      });
//
//      if (response.ok) {
//        const userData = await response.json();
//        setUserRole(userData.role); // Assuming the API returns a user object with a `role` field
//      } else {
//        console.error('Failed to fetch user role');
//      }
//    } catch (error) {
//      console.error('Error fetching user role:', error);
//    }
//  };
//
//  useEffect(() => {
//    fetchUserRole(); // Fetch the user role when the component mounts
//  }, []);
//
//  // Handle sending message
//  const handleSendMessage = () => {
//    if (!messageText.trim()) return; // Don't send empty messages
//
//    // Only allow admin to send messages
//    if (userRole !== 'admin') {
//      return; // If the user is not an admin, do nothing
//    }
//
//    const newMessage = {
//      id: String(messages.length + 1),
//      text: messageText,
//      user: 'admin', // Admin will send the message
//      timestamp: new Date().toLocaleTimeString(),
//    };
//
//    // Update messages state with new message
//    setMessages((prevMessages) => [...prevMessages, newMessage]);
//    setMessageText(''); // Clear the input field
//  };
//
//  // Render each message item
//  const renderItem = ({ item }: { item: Message }) => (
//    <View style={[styles.messageContainer, item.user === 'admin' && styles.adminMessage]}>
//      <Text style={[styles.messageText, item.user === 'admin' && styles.adminMessageText]}>
//        {item.text}
//      </Text>
//      <Text style={[styles.timestamp, item.user === 'admin' && styles.adminTimestamp]}>
//        {item.timestamp}
//      </Text>
//    </View>
//  );
//
//  if (userRole === null) {
//    return <Text>Loading...</Text>; // Show loading state while fetching role
//  }
//
//  return (
//    <KeyboardAvoidingView
//      style={styles.container}
//      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//    >
//      <View style={styles.header}>
//        <Text style={styles.headerText}>Artisan Chat</Text>
//      </View>
//
//      <FlatList
//        data={messages}
//        renderItem={renderItem}
//        keyExtractor={(item) => item.id}
//        contentContainerStyle={styles.messagesList}
//      />
//
//      {/* Input Field and Send Button */}
//      <View style={styles.inputContainer}>
//        <TextInput
//          style={styles.input}
//          value={messageText}
//          onChangeText={setMessageText}
//          placeholder="Type your message..."
//          placeholderTextColor={lightGray}
//        />
//        {userRole === 'admin' && (
//          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
//            <FontAwesome5 name="paper-plane" size={24} color={white} />
//          </TouchableOpacity>
//        )}
//      </View>
//    </KeyboardAvoidingView>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: white,
//  },
//  header: {
//    backgroundColor: darkGreen,
//    paddingVertical: 30,
//    alignItems: 'center',
//  },
//  headerText: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    color: white,
//    top: 10,
//  },
//  messagesList: {
//    paddingBottom: 80, // Ensure there's enough space for the input field
//    paddingHorizontal: 20,
//  },
//  messageContainer: {
//    backgroundColor: '#f1f1f1',
//    padding: 12,
//    borderRadius: 12,
//    marginBottom: 10,
//    maxWidth: '80%',
//    alignSelf: 'flex-start',
//  },
//  adminMessage: {
//    backgroundColor: darkGreen,
//    alignSelf: 'flex-end',
//  },
//  messageText: {
//    fontSize: 16,
//    color: '#333',
//  },
//  adminMessageText: {
//    color: white,
//  },
//  timestamp: {
//    fontSize: 12,
//    color: lightGray,
//    marginTop: 5,
//    alignSelf: 'flex-end',
//  },
//  adminTimestamp: {
//    color: white,
//  },
//  inputContainer: {
//    flexDirection: 'row',
//    alignItems: 'center',
//    paddingHorizontal: 20,
//    paddingVertical: 10,
//    borderTopWidth: 1,
//    borderTopColor: lightGray,
//    backgroundColor: white,
//  },
//  input: {
//    flex: 1,
//    height: 40,
//    borderWidth: 1,
//    borderColor: lightGray,
//    borderRadius: 20,
//    paddingHorizontal: 10,
//    fontSize: 16,
//  },
//  sendButton: {
//    marginLeft: 10,
//    backgroundColor: darkGreen,
//    borderRadius: 50,
//    padding: 10,
//  },
//});
//
//export default ArtisansChat;

