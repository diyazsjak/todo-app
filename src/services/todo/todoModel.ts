import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export default class TodoModel {
  private _documentId;
  private _content;
  private _isCompleted;
  private _userUid;

  constructor(
    documentId: string,
    content: string,
    isCompleted: boolean,
    userUid: string,
  ) {
    this._documentId = documentId;
    this._content = content;
    this._isCompleted = isCompleted;
    this._userUid = userUid;
  }

  public static fromFirebase(
    documentSnapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot,
  ) {
    const fields = documentSnapshot.data();

    return new TodoModel(
      documentSnapshot.id,
      fields.content,
      fields.isCompleted,
      fields.userUid,
    );
  }

  public get content(): string {
    return this._content;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }

  public get userUid(): string {
    return this._userUid;
  }

  public get documentId(): string {
    return this._documentId;
  }
}
