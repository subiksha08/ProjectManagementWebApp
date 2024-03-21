import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, Task } from './model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }
  
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }

  updateProject(projectId: number, updatedProject: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${projectId}`, updatedProject);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}`);
  }

  addTaskToProject(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, task);
  }

  updateTaskStatus(projectId: number, taskId: number, newStatus: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`, { status: newStatus });
  }

  createTask(projectId: number, task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/tasks`, task);
  }

  getTasks(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  updateTask(projectId: number, taskId: number, updatedTask: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`, updatedTask);
  }

  deleteTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`);
  }
}
