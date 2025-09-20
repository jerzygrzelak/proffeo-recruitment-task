import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsListComponent } from './features/posts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostsListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('proffeo-task');
}
