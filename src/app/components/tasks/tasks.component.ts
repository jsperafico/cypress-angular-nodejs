import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private service: TaskService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.service.get().subscribe((tasks) => this.tasks = tasks);
  }

  add(task: Task): void {
    task.id = Math.ceil(Math.random() * 100);
    this.service.post(task).subscribe((task) => this.tasks.push(task));
  }

  delete(task: Task): void {
    this.service.delete(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    });
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.service.update(task).subscribe();
  }
}
