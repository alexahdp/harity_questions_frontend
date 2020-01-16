import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '@app/models/user';
import { Idea, IdeaDTO } from '@app/models/idea';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = environment.api_server + '/api';
  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: string, endpoint: string, body?: any): Observable<any> {
    const url = this.api + '/' + endpoint;
    return this.http.request(method, url, {body, headers: {
      authorization: `Bearer ${this.auth.token}`,
    }});
  }

  getUsers(page?: string): Observable<User[]> {
    const endpoint = page ? `users?page=${page}` : 'users';
    return this.request('GET', endpoint)
  }

  getUser(username: string): Observable<User> {
    return this.request('GET', `users/${username}`);
  }

  getIdeas(page?: number): Observable<Idea>  {
    const endpoint = page ? `ideas?page=${page}` : 'ideas';
    return this.request('GET', endpoint);
  }

  getNewestIdeas(page?: number): Observable<Idea> {
    const endpoint = page ? `ideas/last?page=${page}` : 'ideas/last';
    return this.request('GET', endpoint);
  }

  createIdea(data: IdeaDTO): Observable<Idea> {
    return this.request('POST', 'idea', data);
  }

  updateIdea(id: string, data: Partial<IdeaDTO>): Observable<Idea> {
    return this.request('PUT', `idea/${id}`, data);
  }

  upvoteIdea(ideaId: string) {
    return this.request('POST', `idea/${ideaId}/upvote`);
  }

  downvoteIdea(ideaId: string) {
    return this.request('POST', `idea/${ideaId}/downvote`);
  }

  bookmarkIdea(ideaId: string) {
    return this.request('POST', `idea/${ideaId}/bookmark`);
  }

  unbookmarkIdea(ideaId: string) {
    return this.request('DELETE', `idea/${ideaId}/bookmark`);
  }

  getCommentsByIdea(ideaId: string, page?: number) {
    const endpoint = page ? `comments/idea/${ideaId}?page=${page}` : `comments/idea/${ideaId}`;
    return this.request('GET', endpoint);
  }

  getCommentsByUser(userId: string, page?: number) {
    const endpoint = page ? `comments/user/${userId}?page=${page}` : `comments/user/${userId}`;
    return this.request('GET', endpoint);
  }

  createComment(ideaId: string, data): Observable<Comment> {
    const endpoint = `comments/idea/${ideaId}`;
    return this.request('POST', endpoint, data);
  }

  deleteComment(commentId: string): Observable<Comment> {
    const endpoint = `comments/${commentId}`;
    return this.request('DELETE', endpoint);
  }
}
