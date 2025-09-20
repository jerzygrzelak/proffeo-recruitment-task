import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsListComponent } from './features/posts';
import { PostFiltersComponent } from './features/posts/post-filters/post-filters.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostsListComponent, PostFiltersComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('proffeo-task');
}
