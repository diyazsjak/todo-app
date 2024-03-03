import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

import TodoService from '../services/todo/todoService';
import AuthService from '../services/auth/authService';

export default function CreateTodoForm() {
  const [content, setContent] = useState('');

  const userUid = AuthService.currentUser!.uid;

  return (
    <TextInput
      label="Your todo"
      value={content}
      onChangeText={text => setContent(text)}
      mode="outlined"
      multiline={true}
      right={
        <TextInput.Icon
          icon="plus"
          size={30}
          forceTextInputFocus={false}
          onPress={async () => {
            setContent('');
            await TodoService.createTodo(userUid, content);
          }}
        />
      }
    />
  );
}
