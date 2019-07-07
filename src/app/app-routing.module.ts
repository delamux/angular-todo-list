import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoesComponent} from './pages/todoes/todoes.component';
import {TodoComponent} from './pages/todo/todo.component';

const routes: Routes = [
  {path: 'todoes', component: TodoesComponent},
  {path: 'todo/:id', component: TodoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'todoes'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
