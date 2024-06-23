import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-sprint-main',
  templateUrl: './sprint-main.component.html',
  styleUrls: ['./sprint-main.component.scss']
})
export class SprintMainComponent {
@ViewChild ('tab') tab!:MatTabGroup
constructor(private sprintService :SprintService){}
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.sprintService.getActiveSprintStories().length > 0 &&  this.selectTab()
 
}
selectTab(): void {
  this.tab.selectedIndex = 2;
}
}
