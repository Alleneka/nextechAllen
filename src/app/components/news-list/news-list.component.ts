import { Component, ViewChild } from '@angular/core';
import { HackerNewsService } from '../../services/hacker-news.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { MatList } from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';


export interface StoryItem{
  id:number,
  title:string,
  url:string,
  by:string,
  score:number,
  time:number,
  text:string
}

export interface SearchResult {
  items: StoryItem[];
  totalCount: number;
}

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [NewsItemComponent, PaginationComponent, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatPaginator, MatIcon, MatInput, FormsModule, MatList, MatProgressBar, HttpClientModule, SearchBarComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {
  //dataSource!: MatTableDataSource<number>;
  stories: any[] = [];
  currentPage = 1;
  pageSize = 20;
  totalCount = 200;
  displayedColumns: string[] = ['id', 'title', 'url'];
  searchQuery: string = '';
  isLoading: boolean = false;
  isSearch: boolean = false;
  isNewSearch: boolean = false;
  query: string = '';


  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(){
    this.loadStories();
  }

  loadStories(){
    this.isLoading = true;
    this.hackerNewsService.getNewestStories(this.currentPage, this.pageSize).subscribe(data => {
      this.stories = data;
      console.log(this.stories);
      console.log(this.stories[1].by);
      this.totalCount = 500;
      this.isLoading = false;
      
    })
  }

  /*onPageChange1(event: PageEvent){
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize
    this.loadStories();
  }*/

  onPageChange(page: number){
    this.currentPage = page;
    if(this.isSearch){
      this.onSearch(this.query);
    }else{
      this.loadStories();
    }
    
  }

  onPageSize(size: number){
   this.pageSize = size;
   this.onSearch(this.query);
  }


  onSearch(query: string){
    
    console.log("query: " + this.query);
    if(typeof query === "string" && query.trim() === ""){
      console.log("loadStories...");
      this.isSearch = false;
      this.loadStories();
      

    }else{
      console.log("searching...");
      this.isSearch = true;
      if(this.query != query){
        this.isNewSearch = true;
        this.currentPage = 1;
      }else{
        this.isNewSearch = false;
      }
      this.query = query;

      this.isLoading = true;
      this.hackerNewsService.searchStories(this.query, this.currentPage, this.pageSize).subscribe(data => {
      
        this.stories = data.items;
        this.totalCount = data.totalCount
        console.log("Count: " + this.totalCount + ". Search: " + this.stories)
        //this.dataSource = new MatTableDataSource(this.stories);
        this.isLoading = false;
      })
    }
    
  }

}
