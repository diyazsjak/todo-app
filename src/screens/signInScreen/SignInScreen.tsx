import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';

import {styles} from './styles';
import AuthService from '../../services/auth/authService';
import Routes from '../../constants/routes';

export default function SignInScreen({navigation}: {navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  function _validateInput(): boolean {
    if (email === '' || password === '') {
      setInputError(true);
      return true;
    }

    return false;
  }

  async function _signIn() {
    if (_validateInput()) return;

    setLoading(true);
    setInputError(false);
    await AuthService.signIn(email, password)
      .then(() => {
        navigation.replace(Routes.HOME_ROUTE);
      })
      .catch(e => {
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
          label="Password"
          error={inputError}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="elevated" loading={loading} onPress={_signIn}>
          Sign In
        </Button>
        <Button onPress={() => navigation.navigate(Routes.SIGN_UP_ROUTE)}>
          Don't have an account? Sign Up
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
