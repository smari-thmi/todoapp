import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/dataservice.service';
import { DialogserviceService } from 'src/app/dialogservice.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css'],
})
export class TodoDialogComponent {
  toDoForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', [Validators.required, Validators.maxLength(100)]],
  });

  @Output() newTodoAdded = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataserviceService,
    private message: NzMessageService,
    public dialogService: DialogserviceService
    
  ) {}

  handleOk(): void {
    this.onSubmit();
  }

  handleCancel(): void {
    this.dialogService.isDialogOpen = false;
  }

  onSubmit() {
    if (this.toDoForm.invalid) {
      this.message.create('error', 'Woops missing fields!');
      return;
    }
    this.dataService.addTodo(this.toDoForm.value).subscribe((respones) => {
      respones.ok ? this.newTodoAdded.emit() : null;
    });
    this.toDoForm.reset()
    this.dialogService.isDialogOpen = false;
  }
}
