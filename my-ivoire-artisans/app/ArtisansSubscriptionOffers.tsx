import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { darkGreen, white, lightGray } from './Constants';

// Define unique colors for each plan
const PLAN_COLORS = {
  basic: '#A3D8A3',     // Light Green for Basic
  premium: '#FFD700',   // Gold for Premium
  last: 'black',        // Black for Last
};

const ArtisansSubscriptionOffers: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]); // Store available subscription plans
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Load user ID from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  const mockPlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      description: 'Access to basic features of the app, perfect for new artisans.',
      price: '10,000 CFA',
      color: PLAN_COLORS.basic,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      description: 'All features unlocked, including priority support and exclusive offers.',
      price: '20,000 CFA',
      color: PLAN_COLORS.premium,
    },
    {
      id: 'last',
      name: 'Last Plan',
      description: 'Premium features + advanced business tools to help you scale.',
      price: '30,000 CFA',
      color: PLAN_COLORS.last,
    },
  ];

  useEffect(() => {
    setPlans(mockPlans); // Simulate data fetching
  }, []);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const confirmSubscription = async () => {
    if (!selectedPlan || !userId) return;

    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app';
      await axios.post(`${apiUrl}/api/subscribe`, { userId, subscription: selectedPlan });
      alert(`Subscription confirmed: ${selectedPlan}`);
    } catch (error) {
      console.error("Subscription error:", error);
      alert('Failed to confirm subscription');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Subscription</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {plans.length === 0 ? (
          <Text style={styles.noPlans}>No subscription plans available at the moment.</Text>
        ) : (
          plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { backgroundColor: plan.color },
                selectedPlan === plan.id && styles.selectedCard,
              ]}
              onPress={() => handleSelectPlan(plan.id)}
            >
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planDescription}>{plan.description}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planDetails}>Tap to Select</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedPlan && styles.disabledButton,
        ]}
        disabled={!selectedPlan}
        onPress={confirmSubscription}
      >
        <Text style={styles.confirmButtonText}>
          {selectedPlan ? 'Confirm Subscription' : 'Please Select a Plan'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: darkGreen,
    textAlign: 'center',
    marginBottom: 40,
    top: 30,
  },
  scrollContainer: {
    paddingBottom: 20,
    top : 30,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: lightGray,
    elevation: 4,
  },
  selectedCard: {
    borderColor: darkGreen,
    shadowOpacity: 0.3,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: white,
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
    marginBottom: 10,
  },
  planDetails: {
    fontSize: 14,
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: darkGreen,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
  noPlans: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default ArtisansSubscriptionOffers;
