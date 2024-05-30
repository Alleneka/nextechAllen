import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { StoryItem } from '../news-list/news-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatDialogModule, DialogBodyComponent,MatCardModule],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.css'
})
export class NewsItemComponent {

  @Input() story: StoryItem | undefined;

  constructor(public matDialog:MatDialog){ }



  showDialog(story: StoryItem) {
    this.matDialog.open(DialogBodyComponent, {width: '600px', height: '500px', data:story});
  }
}
