import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, Post, User } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';
  private http = inject(HttpClient);

  public getPosts(userId?: number): Observable<Post[]> {
    let params = new HttpParams();
    if (userId !== undefined && userId !== null) {
      params = params.set('userId', userId.toString());
    }

    return this.http.get<Post[]>(`${this.API_URL}/posts`, { params });
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${userId}`);
  }

  public getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/posts/${postId}/comments`);
  }
}
