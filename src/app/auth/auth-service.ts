import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { stringify } from "querystring";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "./user-model";

export interface ResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userSubject = new BehaviorSubject<UserModel>(null);
    constructor(private http: HttpClient) { }
    public tokenTme:any;

    signUp(email: string, password: string) {
        return this.http
            .post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe5mcb42f3GxHN2y30lhACnzVJXGfY0GY',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
            )
    }

    signIn(email: string, password: string) {
        return this.http
            .post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDe5mcb42f3GxHN2y30lhACnzVJXGfY0GY',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })

            )
    }

    logout() {
        this.userSubject.next(null);
        localStorage.removeItem('userData');
        if(this.tokenTme){
            clearTimeout(this.tokenTme);
        }
        this.tokenTme = null;
    }

    autoLogin() {
        const userdata: { email: string, id: string, _token: string, _expiryData: number } = JSON.parse(localStorage.getItem('userData'));
        if (!userdata) {
            return;
        }
        const loadUser = new UserModel(userdata.email, userdata.id, userdata._token, new Date(userdata._expiryData));
        if (loadUser.token) {
            this.userSubject.next(loadUser);
            const time = new Date(userdata._expiryData).getTime() - new Date().getTime();
            this.autoLogout(time);
        }
    }

    autoLogout(deadline: number) {

        this.tokenTme = setTimeout(() => {
            this.logout();
        }, deadline)
    }


    private handleAuth(email: string, localId: string, token: string, expiryDate: number) {
        const expiryData = new Date(new Date().getTime() + expiryDate * 1000)
        const user = new UserModel(email, localId, token, expiryData);
        this.userSubject.next(user);
        this.autoLogout(expiryDate*1000)
        localStorage.setItem('userData', JSON.stringify(user));

    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'A unknown error occured!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'A Email already exists'
                break;

            case 'EMAIL_NOT_FOUND':
                errorMsg = 'Email does not exist'
                break;

            case 'INVALID_PASSWORD':
                errorMsg = 'password is incorrect'
                break;

        }
        return throwError(errorMsg);
    }



}