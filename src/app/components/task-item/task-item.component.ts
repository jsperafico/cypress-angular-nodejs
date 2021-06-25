import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  faTimes = faTimes;

  @Output() onDeleteEvent: EventEmitter<Task>;
  @Output() onToggleEvent: EventEmitter<Task>;

  constructor() {
    this.task = {
      text: "Not Defined",
      day: "Not scheduled",
      reminder: false,
    }
    this.onDeleteEvent = new EventEmitter();
    this.onToggleEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onDelete(task: Task): void {
    this.onDeleteEvent.emit(task);
  }

  onToggle(task: Task): void {
    this.onToggleEvent.emit(task);
  }
}
