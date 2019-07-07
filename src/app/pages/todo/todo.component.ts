import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TodoModel} from '../../models/todo.model';
import {TodoService} from '../../services/todo.service';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: TodoModel = new TodoModel();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  save(form: NgForm) {
    Swal.fire({
      title: 'Saving data!',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let petition: Observable<any>;

    if (this.todo.id) {
      petition = this.todoService.edit(this.todo);
    } else {
      petition = this.todoService.add( this.todo );
    }

    petition.subscribe( (resp: any) => {
      Swal.fire({
        title: this.todo.name,
        text: 'The todo is updated',
        type: 'success'
      });
    });
  }
}
