import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StoreService } from '../../../services';

@Component({
  selector: 'app-posts-list',
  imports: [MatCardModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
  standalone: true,
})
export class PostsListComponent implements OnInit {
  private storeService = inject(StoreService);

  posts = this.storeService.posts;

  public ngOnInit(): void {
    this.storeService.fetchPosts();
  }
}
