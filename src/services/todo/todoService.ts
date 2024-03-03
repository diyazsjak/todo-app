import firestore from '@react-native-firebase/firestore';

export default class TodoService {
  private static _todoCollection = firestore().collection('todos');

  public static todoCollection(userUid: string) {
    return this._todoCollection.where('userUid', '==', userUid);
  }

  public static async createTodo(
    userUid: string,
    content: string,
  ): Promise<void> {
    await this._todoCollection.add({
      content: content,
      isCompleted: false,
      userUid: userUid,
    });
  }

  public static async updateTodo(
    documentId: string,
    content: string,
    isCompleted: boolean,
  ): Promise<void> {
    await this._todoCollection.doc(documentId).update({
      content: content,
      isCompleted: isCompleted,
    });
  }

  public static async deleteTodo(documentId: string): Promise<void> {
    await this._todoCollection.doc(documentId).delete();
  }
}
