import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  constructor(
    private dataService: DataserviceService,
    private message: NzMessageService
  ) {}
  
  @Input() todo: any;
  @Output() todoDeleted = new EventEmitter(true)

  deletePost() {
    this.dataService.deleteTodo(this.todo.id).subscribe((response) => {
      if (!response.ok) {
        this.message.create('error', 'Woops did not mange to delete the post');
        return
      }
        this.message.create('success', 'Post deleted!');
        this.todoDeleted.emit()
    });
  }
}
