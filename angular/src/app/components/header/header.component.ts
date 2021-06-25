import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private router: Router) { 
    this.showAddTask = false;
    this.subscription = this.uiService.onToogle().subscribe((value)=> {this.showAddTask = value});
  }

  ngOnInit(): void {
  }

  toogleAddTask(): void {
    this.uiService.toogleAddTask();
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
}
