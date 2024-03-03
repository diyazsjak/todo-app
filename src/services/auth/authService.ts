import auth from '@react-native-firebase/auth';

import AuthUser from './authUser';

export default class AuthService {
  public static get currentUser(): AuthUser | null {
    const user = auth().currentUser;
    return user ? AuthUser.fromFirebase(user) : null;
  }

  public static async signIn(email: string, password: string): Promise<void> {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        switch (e.code) {
          case 'auth/invalid-credential':
            throw new Error('Wrong email or password');
          case 'auth/invalid-email':
            throw new Error('Enter valid email');
          case 'auth/too-many-requests':
            throw new Error('Too many requests. Try later or change password')
          default:
            throw new Error('Authentication error');
        }
      });
  }

  public static async signUp(email: string, password: string): Promise<void> {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(e => {
        switch (e.code) {
          case 'auth/email-already-in-use':
            throw new Error('This email is already taken');
          case 'auth/invalid-email':
            throw new Error('Enter valid email');
          case 'auth/weak-password':
            throw new Error('Your password is too weak');
          default:
            throw new Error('Authentication error');
        }
      });
  }

  public static async signOut(): Promise<void> {
    if (this.currentUser) {
      await auth().signOut();
    }
  }
}
