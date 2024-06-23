import { Component } from '@angular/core';
import { SprintService } from '../services/sprint.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-active-sprints',
  templateUrl: './active-sprints.component.html',
  styleUrls: ['./active-sprints.component.scss']
})
export class ActiveSprintsComponent {
  constructor(public sprintService :SprintService){

  }
  menuType =[ 
    {
      displayName:"Create Story",
      routerLink:"/sprint/create-story"
    },
    {
      displayName:"Create Sprint",
       routerLink:"create-sprint"
    }
  ]
  
 
}
