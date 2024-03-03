import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {styles} from './styles';
import TodoService from '../../services/todo/todoService';

export default function TodoScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {todo} = route.params;

  const [content, setContent] = useState(todo.content);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function _updateTodo() {
    setEditLoading(true);
    await TodoService.updateTodo(todo.documentId, content, todo.isCompleted);
    navigation.pop();
  }

  async function _deleteTodo() {
    setDeleteLoading(true);
    await TodoService.deleteTodo(todo.documentId);
    navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          mode="outlined"
          label="Your todo"
          multiline={true}
          value={content}
          onChangeText={setContent}
        />
        <View style={styles.buttons}>
          <Button mode="elevated" loading={editLoading} onPress={_updateTodo}>
            Edit
          </Button>
          <Button
            mode="elevated"
            loading={deleteLoading}
            textColor="maroon"
            onPress={_deleteTodo}>
            Delete
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
