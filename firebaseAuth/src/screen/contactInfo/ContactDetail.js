import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '../../component/Button';

const ContactDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { contact } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
        <Text style={styles.name}>{contact?.name}</Text>
        <Text style={styles.email}>{contact?.email}</Text>
      </View>
      <View style={styles.details}>
        <DetailRow label="Phone:" value={contact.phoneNumber || 'N/A'} />
        <DetailRow label="Street:" value={contact.address?.street || 'N/A'} />
        <DetailRow label="City:" value={contact.address?.city || 'N/A'} />
        <DetailRow label="State:" value={contact.address?.state || 'N/A'} />
        <DetailRow label="Zip Code:" value={contact.address?.zipCode || 'N/A'} />
      </View>
      <Button
        onPress={() => navigation.goBack()}
        title={'Back'}
      />
    </ScrollView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text numberOfLines={1} style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E384D',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#7D879C',
    marginBottom: 20,
  },
  details: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap:10
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E384D',
  },
  value: {
    fontSize: 16,
    color: '#7D879C',
  },
});

export default ContactDetail;
