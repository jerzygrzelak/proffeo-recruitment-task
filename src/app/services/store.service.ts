import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiService } from './api.service';
import { Comment, Post, User } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiService = inject(ApiService);
  private _posts = signal<Post[]>([]);
  private _users = signal<Record<number, User>>({});
  private _comments = signal<Record<number, Comment[]>>({});

  public readonly posts = this._posts.asReadonly();
  public readonly users = this._users.asReadonly();
  public readonly comments = this._comments.asReadonly();
  public readonly loadingPosts = signal(false);

  public favoritePosts = signal<Set<number>>(new Set());

  public postFilters = signal({
    searchTerm: '',
    selectedUserId: null as number | null,
    showFavoritesOnly: false,
  });

  public fetchPosts(userId?: number): void {
    this.loadingPosts.set(true);

    this.apiService
      .getPosts(userId ?? userId)
      .pipe(catchError(() => of([])))
      .subscribe((posts) => {
        this._posts.set(posts);
        this.loadingPosts.set(false);
      });
  }

  public fetchUser(userId: number): void {
    if (this._users()[userId]) return;

    this.apiService
      .getUser(userId)
      .pipe(catchError(() => of(null)))
      .subscribe((user) => {
        if (user) {
          this._users.update((state) => ({
            ...state,
            [userId]: user,
          }));
        }
      });
  }

  public fetchComments(postId: number): void {
    if (this._comments()[postId]) return;

    this.apiService
      .getComments(postId)
      .pipe(catchError(() => of([])))
      .subscribe((comments) => {
        this._comments.update((state) => ({
          ...state,
          [postId]: comments,
        }));
      });
  }

  public toggleFavorite(postId: number): void {
    const favs = new Set(this.favoritePosts());
    if (favs.has(postId)) {
      favs.delete(postId);
    } else {
      favs.add(postId);
    }
    this.favoritePosts.set(favs);
  }

  public isFavorite(postId: number): boolean {
    return this.favoritePosts().has(postId);
  }
}
