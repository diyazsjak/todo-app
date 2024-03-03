import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default class AuthUser {
  private _email: string;
  private _uid: string;

  constructor(email: string, uid: string) {
    this._email = email;
    this._uid = uid;
  }

  public static fromFirebase(user: FirebaseAuthTypes.User): AuthUser {
    return new AuthUser(user.email!, user.uid);
  }

  public get email(): string {
    return this._email;
  }
  
  public get uid(): string {
    return this._uid;
  }
}
