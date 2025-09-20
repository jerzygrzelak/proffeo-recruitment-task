import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiService } from './api.service';
import { Post } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiService = inject(ApiService);
  private _posts = signal<Post[]>([]);

  public readonly posts = this._posts.asReadonly();

  public fetchPosts(): void {
    if (this._posts().length > 0) {
      return;
    }

    this.apiService
      .getPosts()
      .pipe(catchError(() => of([])))
      .subscribe((posts) => {
        this._posts.set(posts);
      });
  }
}
