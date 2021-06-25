import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddEvent: EventEmitter<Task>;

  text: string;
  day: string;
  reminder: boolean;

  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.text = '';
    this.day = '';
    this.reminder = false;
    this.onAddEvent = new EventEmitter<Task>();

    this.showAddTask = false;
    this.subscription = this.uiService.onToogle().subscribe((value)=> {this.showAddTask = value});
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.text) {
      alert('Please inform a task description');
    }
    if (!this.day) {
      alert('Please inform a task day');
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    };

    this.onAddEvent.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
