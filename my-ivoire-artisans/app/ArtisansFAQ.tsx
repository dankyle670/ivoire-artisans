import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { darkGreen, white, lightGray } from './Constants';

const ArtisansFAQ: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>

      <ScrollView style={styles.faqList}>
        {/* FAQ 1 */}
        <View style={styles.faqItem}>
          <Text style={styles.question}>1. How do I update my profile?</Text>
          <Text style={styles.answer}>To update your profile, go to 'My Account' and click 'Edit Profile'.</Text>
        </View>

        {/* FAQ 2 */}
        <View style={styles.faqItem}>
          <Text style={styles.question}>2. How do I change my subscription plan?</Text>
          <Text style={styles.answer}>You can change your subscription plan by visiting 'Subscription Settings' and choosing the plan that fits your needs.</Text>
        </View>

        {/* FAQ 3 */}
        <View style={styles.faqItem}>
          <Text style={styles.question}>3. How do I contact support?</Text>
          <Text style={styles.answer}>You can contact support by calling or emailing us using the contact options on the 'Contact' page.</Text>
        </View>

        {/* FAQ 4 */}
        <View style={styles.faqItem}>
          <Text style={styles.question}>4. How do I receive payments?</Text>
          <Text style={styles.answer}>Payments are made directly to your linked payment method (e.g., bank account, Orange Money). Please ensure your payment method is correctly set up in 'Payment Settings'.</Text>
        </View>

        {/* FAQ 5 */}
        <View style={styles.faqItem}>
          <Text style={styles.question}>5. What if I have technical issues?</Text>
          <Text style={styles.answer}>If you're experiencing technical issues, please contact our support team via phone or email, and we'll assist you promptly.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 20,
  },
  faqList: {
    marginTop: 10,
  },
  faqItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: lightGray,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkGreen,
  },
  answer: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
});

export default ArtisansFAQ;
