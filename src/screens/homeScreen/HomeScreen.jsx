import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {Appbar, Portal, Dialog, Button} from 'react-native-paper';

import {styles} from './styles';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import TodoTile from '../../components/TodoTile';
import CreateTodoForm from '../../components/CreateTodoForm';
import TodoModel from '../../services/todo/todoModel';
import TodoService from '../../services/todo/todoService';
import AuthService from '../../services/auth/authService';
import Routes from '../../constants/routes';

export default function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const userUid = AuthService.currentUser.uid;

  useEffect(() => {
    const subscriber = TodoService.todoCollection(userUid).onSnapshot(
      querySnapshot => {
        const todos = [];
        querySnapshot.forEach(documentSnapshot => {
          todos.push(TodoModel.fromFirebase(documentSnapshot));
        });

        setTodos(todos);
        setLoading(false);
      },
    );

    return subscriber;
  }, []);

  if (loading) return <LoadingScreen />;

  async function _signOut() {
    await AuthService.signOut().then(() => {
      navigation.replace(Routes.SIGN_IN_ROUTE);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Todo List" />
        <Appbar.Action icon="logout" onPress={() => setDialogVisible(true)} />
      </Appbar.Header>
      <FlatList
        style={styles.body}
        keyboardDismissMode="on-drag"
        data={todos}
        renderItem={({item}) => (
          <TodoTile key={item.documentId} todo={item} navigation={navigation} />
        )}
      />
      <View style={styles.footer}>
        <CreateTodoForm />
      </View>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Sign out</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                _signOut();
                setDialogVisible(false);
              }}>
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
