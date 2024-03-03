import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';

import HomeScreen from './screens/homeScreen/HomeScreen';
import SignInScreen from './screens/signInScreen/SignInScreen';
import SignUpScreen from './screens/signUpScreen/SignUpScreen';
import TodoScreen from './screens/todoScreen/TodoScreen';
import AuthService from './services/auth/authService';
import Routes from './constants/routes';

const Stack = createNativeStackNavigator();

export default function App() {
  const initialRouteName = AuthService.currentUser
    ? Routes.HOME_ROUTE
    : Routes.SIGN_IN_ROUTE;

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name={Routes.SIGN_IN_ROUTE}
            component={SignInScreen}
            options={{title: 'Sign In'}}
          />
          <Stack.Screen
            name={Routes.SIGN_UP_ROUTE}
            component={SignUpScreen}
            options={{title: 'Sign Up'}}
          />
          <Stack.Screen
            name={Routes.HOME_ROUTE}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.TODO_ROUTE}
            component={TodoScreen}
            options={{title: 'Todo'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
