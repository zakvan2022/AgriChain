import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services';
import { TodoList } from '../../../_interface';

@Component({
  selector: 'ngx-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})

export class ToDoComponent implements OnInit {
  todo: TodoList[] = [];

  constructor( private dashboard: DashboardService ) { }

  ngOnInit() {
    this.get_todo();
  }

  get_todo() {
    this.dashboard.get_todo();
    this.dashboard.todo$.subscribe((res) => {
      this.todo = res;
    });
  }
}
