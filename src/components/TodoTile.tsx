import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {List, Checkbox, Card, IconButton} from 'react-native-paper';

import TodoService from '../services/todo/todoService';
import TodoModel from '../services/todo/todoModel';
import Routes from '../constants/routes';

export default function TodoTile({
  todo,
  navigation,
}: {
  todo: TodoModel;
  navigation: any;
}) {
  const [selected, setSelected] = useState(todo.isCompleted);

  function onPressed() {
    navigation.push(Routes.TODO_ROUTE, {todo: todo});
  }

  async function onSelected() {
    await TodoService.updateTodo(todo.documentId, todo.content, !selected);
    setSelected(!selected);
  }

  async function onDeleted() {
    await TodoService.deleteTodo(todo.documentId);
  }

  return (
    <ScrollView>
      <Card style={{margin: 6}} onPress={onPressed}>
        <List.Item
          title={todo.content}
          left={() => (
            <IconButton icon="delete" iconColor="maroon" onPress={onDeleted} />
          )}
          right={() => (
            <View style={{transform: 'translateY(10px)'}}>
              <Checkbox
                status={selected ? 'checked' : 'unchecked'}
                onPress={onSelected}
              />
            </View>
          )}
        />
      </Card>
    </ScrollView>
  );
}
