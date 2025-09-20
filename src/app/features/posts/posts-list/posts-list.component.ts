import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StoreService } from '../../../services';
import { SlicePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailsDialogComponent } from '../post-details/post-details-dialog.component';
import { Post } from '../../../shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-posts-list',
  imports: [MatCardModule, SlicePipe, MatProgressSpinnerModule, MatCheckboxModule],
  templateUrl: './posts-list.component.html',
  standalone: true,
})
export class PostsListComponent implements OnInit {
  private readonly storeService = inject(StoreService);
  private readonly dialog = inject(MatDialog);

  public posts = this.storeService.posts;
  public loadingPosts = this.storeService.loadingPosts;
  public filteredPosts = computed(() => {
    const posts = this.posts();
    const filters = this.storeService.postFilters();
    console.log(posts, filters);

    let result = posts;

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(term) || p.body.toLowerCase().includes(term),
      );
    }

    if (filters.selectedUserId) {
      result = result.filter((p) => p.userId === filters.selectedUserId);
    }

    if (filters.showFavoritesOnly) {
      const favs = this.storeService.favoritePosts();
      result = result.filter((p) => favs.has(p.id));
    }

    return result;
  });

  private selectedUserIdSignal = computed(
    () => this.storeService.postFilters().selectedUserId ?? undefined,
  );

  constructor() {
    effect(() => {
      const userId = this.selectedUserIdSignal();
      this.storeService.fetchPosts(userId);
    });
  }

  public ngOnInit(): void {
    this.storeService.fetchPosts();
  }

  public openPostDetailsDialog(post: Post): void {
    this.dialog.open(PostDetailsDialogComponent, {
      data: post,
    });
  }

  public isFavorite(postId: number): boolean {
    return this.storeService.isFavorite(postId);
  }

  public toggleFavorite(postId: number): void {
    this.storeService.toggleFavorite(postId);
  }
}
