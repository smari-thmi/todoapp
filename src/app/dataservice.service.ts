import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/posts/';

  getTodos() {
    return this.http.get(this.url);
  }

  getTodo(id: number) {
    // const postId =   new HttpParams({fromString: "/1"})
    // console.log(postId);
    return this.http.get(this.url + id);
  }

  addTodo(data: any) {
    const body = {
      ...data,
      id: Math.random() * 2,
    };

    return this.http.post(this.url, body, { observe: 'response' });
  }

  deleteTodo(id: number) {
    return this.http.delete(this.url + id, { observe: 'response' });
  }

  updateTodo(id: number, data: any) {
    return this.http.put(this.url + id, data, { observe: 'response' });
  }
}
