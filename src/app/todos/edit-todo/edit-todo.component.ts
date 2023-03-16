import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataserviceService } from '../../dataservice.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  constructor(
    private dataService: DataserviceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {}

  todo: any;
  toDoForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });
  id: any;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dataService.getTodo(this.id).subscribe((data: any) => {
      this.todo = data;
      this.toDoForm.setValue({ title: data.title, body: data.body });
    });
  }

  updateTodo() {
    console.log(this.todo);

    if (
      this.toDoForm.value.body === this.todo.body &&
      this.toDoForm.value.title === this.todo.title
    ) {
      this.message.info('No changes detected');
      return;
    }

    if (this.toDoForm.invalid) {
      this.message.create('error', 'Woops missing fields!');
      return;
    }

    this.dataService
      .updateTodo(this.id, this.toDoForm.value)
      .subscribe((respones) => {
        respones.ok ? this.message.create('success', 'Todo updated') : null;
      });
  }
}
