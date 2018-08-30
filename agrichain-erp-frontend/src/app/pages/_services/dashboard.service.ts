import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TodoList, ProfileList, ZonesList, BulbList } from '../../_interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private todo = new BehaviorSubject<TodoList[]>([]);
  todo$ = this.todo.asObservable();

  private profile_list = new BehaviorSubject<ProfileList|null>(null);
  profile_list$ = this.profile_list.asObservable();

  private zones_list = new BehaviorSubject<ZonesList|null>(null);
  zones_list$ = this.zones_list.asObservable();

  private bulb_list = new BehaviorSubject<BulbList|null>(null);
  bulb_list$ = this.bulb_list.asObservable();

  constructor() { }

  get_profile_list() {
    this.profile_list.next({
      selected_id : 'abc',
      items: [{
        id: 'abc',
        name: 'Profile1',
      }],
    });
  }
  get_zones_list() {
    this.zones_list.next({
      selected_id : 'abc',
      items: [{
        id: 'abc',
        name: 'zones1',
      }],
    });
  }
  get_bulb_list() {
    this.bulb_list.next({
      selected_id : 'abc',
      items: [{
        id: 'abc',
        name: 'bulb1',
      }],
    });
  }

  get_todo() {
    let todo_data: TodoList[] = [
      {
        date: new Date(),
        items: [{
          title: 'Lorem Ipsum',
          appointment_date: new Date(),
          interval: 'M, T, W',
        }],
      },
      {
        date: new Date(),
        items: [{
          title: 'Lorem Ipsum',
          appointment_date: new Date(),
          interval: 'M, T, W',
        }],
      },
    ];
    this.todo.next(todo_data);
  }
}
