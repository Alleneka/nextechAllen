import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../components/news-list/news-list.component';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  public baseUrl = 'https://localhost:44313/api/news';

  constructor(private http: HttpClient) {}

  getNewestStories(page: number, pageSize: number): Observable<any>{
    return this.http.get(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  searchStories(query: string, currentPage: number, pageSize: number): Observable<any>{

    let params = new HttpParams()
      .set('query', query)
      .set('page', currentPage)
      .set('pageSize', pageSize);

    return this.http.get<SearchResult>(`${this.baseUrl}/search`, {params});
  }
}
