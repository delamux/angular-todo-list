import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../models/todo.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'https://angular-todo-list-71bc9.firebaseio.com';
  constructor(private http: HttpClient) {
  }

  todoes() {
    return this.http.get(`${ this.url }/todoes.json`)
      .pipe(
        map( (resp: any) => {
            return this.createArray(resp);
          },
        ),
        delay(1500)
      );
  }

  todo(id: string) {
    return this.http.get(`${ this.url }/todoes/${id}.json`);
  }

  add(todo: TodoModel) {
    return this.http.post(`${ this.url }/todoes.json`, todo)
      .pipe(
        map( (resp: any) => {
          todo.id = resp.name;

          return todo;
        })
      );
  }

  edit(todo: TodoModel) {
    const todoTemp =  {
      ...todo
    };

    delete todoTemp.id;

    return this.http.put(`${ this.url }/todoes/${todo.id}.json`, todoTemp);
  }

  private createArray(todoesObj: object) {
    const todoes: TodoModel[] = [];
    if (todoesObj === null) {
      return [];
    }

    Object.keys(todoesObj).forEach( key => {
      const todo: TodoModel = todoesObj[key];
      todo.id = key;
      todoes.push(todo);
    });

    return todoes;
  }

  delete(id: string) {
    return this.http.delete(`${ this.url }/todoes/${id}.json`);
  }
}
