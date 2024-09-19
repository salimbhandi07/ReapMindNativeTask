import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createContactForm} from '../../../redux/slice/userSlice';
import {Button} from '../../component/Button';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../component/Heading';
import Toast from 'react-native-toast-message';

const ContactForm = () => {
  const navigation = useNavigation();
  const isSubmitting = useSelector(state => state?.user?.isSubmitting);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const {name, email, phoneNumber, street, city, state, zipCode} = form;
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !street ||
      !city ||
      !state ||
      !zipCode
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const payload = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: {
        street: street,
        city: city,
        zipCode: zipCode,
        state: state,
      },
    };
    await dispatch(createContactForm(payload)).unwrap();
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Contact form submitted successfully',
    });
    navigation.navigate('List');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <Heading title={'Contact Form'} />

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={form.name}
          onChangeText={value => handleChange('name', value)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={value => handleChange('email', value)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={form.phoneNumber}
          onChangeText={value => handleChange('phoneNumber', value)}
        />

        <Text style={styles.label}>Street</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street"
          value={form.street}
          onChangeText={value => handleChange('street', value)}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={form.city}
          onChangeText={value => handleChange('city', value)}
        />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter state"
          value={form.state}
          onChangeText={value => handleChange('state', value)}
        />

        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter zip code"
          keyboardType="numeric"
          value={form.zipCode}
          onChangeText={value => handleChange('zipCode', value)}
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSubmit}
            style={styles.button}
            textStyle={styles.buttonText}
            title={'Submit'}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexGrow: 1,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    width: width > 360 ? '50%' : '100%',
    alignSelf: 'center',
  },
});

export default ContactForm;
