import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TodoModel} from '../../models/todo.model';
import {TodoService} from '../../services/todo.service';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: TodoModel = new TodoModel();
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.todoService.todo( id ).subscribe( (resp: TodoModel) => {
        this.todo = resp;
        this.todo.id = id;
      });
    }
  }

  save() {
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
