import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks!:Task[];

  constructor(private taskService:TaskService) {
    taskService.getTasks().subscribe((results) => {
      this.tasks = results;
    }, (err) => {
      console.log(err);
    });
  }

  
  ngOnInit(): void {
  }
  
  }



