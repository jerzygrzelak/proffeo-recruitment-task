import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post } from '../../../shared';
import { StoreService } from '../../../services';

@Component({
  selector: 'app-post-details-dialog.component',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatProgressSpinnerModule],
  templateUrl: './post-details-dialog.component.html',
  standalone: true,
})
export class PostDetailsDialogComponent implements OnInit {
  public readonly dialogRef = inject(MatDialogRef<PostDetailsDialogComponent>);
  public readonly data = inject<Post>(MAT_DIALOG_DATA);
  private readonly store = inject(StoreService);

  public comments = this.store.comments;
  public users = this.store.users;

  public ngOnInit(): void {
    this.store.fetchUser(this.data.userId);
    this.store.fetchComments(this.data.id);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
