import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';

import {styles} from './styles';
import AuthService from '../../services/auth/authService';
import Routes from '../../constants/routes';

export default function SignUpScreen({navigation}: {navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  function _validate(): boolean {
    if (email === '' || password === '') {
      setInputError(true);
      return true;
    }

    return false;
  }

  async function _signUp() {
    if (_validate()) return;

    setLoading(true);
    setInputError(false);
    await AuthService.signUp(email, password)
      .then(() => {
        navigation.popToTop();
        navigation.replace(Routes.HOME_ROUTE);
      })
      .catch((e: Error) => {
        setLoading(false);
        setError(e.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.font}
          mode="outlined"
          label="Email"
          error={inputError}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.font}
          mode="outlined"
          placeholder="Password"
          error={inputError}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="elevated" loading={loading} onPress={_signUp}>
          Sign Up
        </Button>
        <Button onPress={() => navigation.navigate(Routes.SIGN_IN_ROUTE)}>
          Already have an account? Sign In
        </Button>
      </View>
      <Snackbar
        visible={error.length > 0}
        onDismiss={() => setError('')}
        style={styles.snackbar}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}
