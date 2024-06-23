import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-back-log',
  templateUrl: './back-log.component.html',
  styleUrls: ['./back-log.component.scss']
})
export class BackLogComponent {

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

  constructor(public sprintService :SprintService){ }
 
}
