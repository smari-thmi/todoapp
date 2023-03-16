import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { DialogserviceService } from '../dialogservice.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(
    private data: DataserviceService,
    private dialogService: DialogserviceService
  ) {}

  todos: any = [];
  ngOnInit(): void {
    this.fetchTodos() 
  }

  fetchTodos() {
    this.data.getTodos().subscribe((todoData) => {
      this.todos = todoData;
    });
  }

  showModal(): void {
    this.dialogService.isDialogOpen = true;
  }
}
