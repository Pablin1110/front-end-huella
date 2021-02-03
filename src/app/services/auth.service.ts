import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token: any;
  userList: Array<any>;


  constructor(private AFauth: AngularFireAuth,
              private router: Router, private db: AngularFirestore,
              private http: HttpClient,
              private storage: NativeStorage,
              private env: EnvService
          ) { }
    login(email: string, password: string){
      return new Promise((resolve, rejected) => {
        this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
          resolve(user);
        }).catch(err => rejected(err));
      });
    }
    logout(){
      this.AFauth.signOut().then( () => {
        this.router.navigate(['/login']);
      });
    }
    resetPassword(email: string){
      return this.AFauth.sendPasswordResetEmail(email);
    }
    register(email: string, password: string, name: string, lastname: string){
      return new Promise((resolve, reject) => {
        this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name,
            lastname,
            uid
          });
          resolve(res);
        }).catch(err => reject(err));
      });
    }
    getUserAuth(){
      return this.AFauth.authState;
    }
    getUser(user: string){
      return this.db.collection('users').doc(user).valueChanges();
    }
    getUidUser(){
      return new Promise((resolve, reject) => {
        this.getUserAuth().subscribe(res => {
          console.log(res.uid);
          const uid = res.email;
          resolve(uid);
        });
      });
    }
}
