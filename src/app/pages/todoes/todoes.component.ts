import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {TodoModel} from '../../models/todo.model';

@Component({
  selector: 'app-todoes',
  templateUrl: './todoes.component.html',
  styleUrls: ['./todoes.component.css']
})
export class TodoesComponent implements OnInit {
  todoList: TodoModel[];
  constructor(private todoes: TodoService) { }

  ngOnInit() {
    this.todoes.todoes().subscribe( resp => {
      this.todoList = resp;
    });
  }

}
