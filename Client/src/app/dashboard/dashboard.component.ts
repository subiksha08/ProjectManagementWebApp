import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Task } from '../model/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  newProjectName: string = '';
  newProjectDescription: string = '';
  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskStatus: string = 'started';
  newTaskPriority: string = 'medium';
  selectedProject!: Project;
  showEditForm: boolean= false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  createProject(): void {
    if (this.newProjectName && this.newProjectDescription) {
      const newProject: Project = {
        id: 0, // ID will be assigned by the backend
        name: this.newProjectName,
        description: this.newProjectDescription,
        tasks: []
      };
      this.projectService.createProject(newProject).subscribe((createdProject: Project) => {
        this.projects.push(createdProject);
        this.clearNewProjectFields();
      });
    }
  }

  clearNewProjectFields(): void {
    this.newProjectName = '';
    this.newProjectDescription = '';
  }
    addTaskToProject(projectId: number ): void {
    if (this.newTaskName && this.newTaskDescription && this.newTaskStatus && this.newTaskPriority) {
      const newTask: Task = {
        id: 0, // ID will be assigned by the backend
        name: this.newTaskName,
        description: this.newTaskDescription,
        status: this.newTaskStatus,
        priority: this.newTaskPriority
      };
  
      this.projectService.addTaskToProject(projectId, newTask).subscribe((addedTask: Task) => {
        const project = this.projects.find(proj => proj.id === projectId);
        if (project) {
          project.tasks.push(addedTask);
          this.clearNewTaskFields();
        }
      });
    }
  }
  
  
  
  clearNewTaskFields(): void {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskStatus = 'started';
    this.newTaskPriority = 'medium';
  }

  toggleEditForm(task: Task): void {
    this.showEditForm = !this.showEditForm;
  }

  updateTaskStatus(projectId: number, taskId: number, newStatus: string): void {
    const project = this.projects.find(proj => proj.id === projectId);
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        this.projectService.updateTaskStatus(projectId, taskId, newStatus).subscribe(() => {
          // Task status updated successfully
        });
      }
    }
  }
}
