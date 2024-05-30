import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StoryItem } from '../components/news-list/news-list.component';

@Component({
  selector: 'app-dialog-body',
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css'
})
export class DialogBodyComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public story:StoryItem, private ref:MatDialogRef<DialogBodyComponent>){
    console.log(story);
    console.log(story.title);
  }

  closePopup(){
    this.ref.close();
  }

}
