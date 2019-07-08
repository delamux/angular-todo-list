import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import { TodoModel } from '../../models/todo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todoes',
  templateUrl: './todoes.component.html',
  styleUrls: ['./todoes.component.css']
})
export class TodoesComponent implements OnInit {
  todoList: TodoModel[] = [];
  loading: boolean;
  constructor(private todoes: TodoService) {
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    this.todoes.todoes().subscribe( resp => {
      this.todoList = resp;
      this.loading = false;
    });
  }

  deleteTodo(id: string, index: number) {
    Swal.fire({
      title: 'Confirm delete',
      text: `Are you sure to delete ${this.todoList[index].name}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp => {
      if (resp.value) {
        this.todoList.splice(index, 1);
        this.todoes.delete(id).subscribe();
      }
    });
  }

}
