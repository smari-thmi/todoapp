import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/users/';

  createNewUser(userDetails:any) {
    return this.http.post(this.url, {...userDetails, id:userDetails.username}, { observe: 'response' } );
    
  }

  login(username:string | undefined | null) {
    return this.http.get(this.url + username)
  }
}
