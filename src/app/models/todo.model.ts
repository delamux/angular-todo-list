export class TodoModel {
  id: string;
  name: string;
  isDone: boolean;

  constructor() {
    this.isDone = false;
  }
}
