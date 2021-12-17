import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl: string = 'http://localhost:5000/tasks'; //locally
  private apiUrl: string = 'http://localhost/api/tasks'; //docker

  constructor(private http: HttpClient) { }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  post(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  delete(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${task._id}`);
  }

  update(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${task._id}`, task, httpOptions);
  }
}
