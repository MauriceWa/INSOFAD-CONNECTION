import { Injectable } from '@angular/core';
import { JwtPayload } from './jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _localStorageTokenKey: string = 'token';

  constructor() { }

  public storeToken(token: string){
    localStorage.setItem(this._localStorageTokenKey, token);
  }

  public loadToken(): string | null {
    return localStorage.getItem(this._localStorageTokenKey);
  }

  private getPayload(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      const jwtPayload = parts[1];
      return JSON.parse(atob(jwtPayload));
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }

  private tokenExpired(token: string): boolean {
    const payload = this.getPayload(token);
    if (!payload) {
      return true;
    }
    const expiry = payload.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public removeToken(){
    localStorage.removeItem(this._localStorageTokenKey);
  }

  public isValid(): boolean {
    const token: string | null = this.loadToken();

    if(!token){
      return false;
    }

    if(this.tokenExpired(token)){
      this.removeToken();
      return false;
    }
    return true;
  }

  public getEmail(): string {
    const token = this.loadToken();
    if(token != null){
      const payload = this.getPayload(token);
      if (payload && payload.email) {
        return payload.email;
      }
    }
    return "";
  }

  public getUserId(): number {
    const token = this.loadToken();

    console.log(token);

    if(token != null){
      const payload = this.getPayload(token);
      if (payload && payload.userId) {
        return payload.userId;
      }
    }
    return 0;
  }

}
