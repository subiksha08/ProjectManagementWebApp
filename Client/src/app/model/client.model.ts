
// project.model.ts
export interface Project {
    id: number;
    name: string;
    description: string;
    tasks: Task[]; // Assuming tasks is an array
  }
  
  export interface Task {
    id: number;
    name: string;
    description: string;
    priority: string;
    status: string;
  }
  