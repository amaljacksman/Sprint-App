import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss'],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class SprintFormComponent {
  sprinForm!: FormGroup;
  menuType = [
    {
      displayName: 'Auto Select',
      click: () => {
        this.onAutoSelect();
      },
    },
    {
      displayName: 'Create Story',
      click: () => {
       this.router.navigate(['/sprint/create-story'])
      },
    },
    {
      displayName: 'Clear Sprint',
      click: () => {
        this.onClearSprint();
      },
    },
   
  ];

  constructor(
    private sprintService: SprintService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  backLog = [...this.sprintService.getBacklogStories()];
  activeSprint = [...this.sprintService.getActiveSprintStories()];
  totalSprintPoint = this.activeSprint.reduce((total, story) => {
    return total + parseInt(story.storypoint, 10); // parseInt to convert string to number
  }, 0);

  drop(event: CdkDragDrop<any[]>) {
    if (this.sprinForm.valid) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        const totalStoryPoints = this.activeSprint.reduce((total, story) => {
          return total + parseInt(story.storypoint, 10);
        }, 0);
        if (this.sprinForm.value.maximumStorypoint < totalStoryPoints) {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
          this.totalSprintPoint = event.container.data.reduce(
            (total, story) => {
              return total + parseInt(story.storypoint, 10);
            },
            0
          );
          this.openSnackBar(
            'The Total story points exeeds Sprint Points',
            'close'
          );
        } else {
          this.totalSprintPoint = totalStoryPoints;
        }
      }
    } else {
      this.sprinForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sprinForm = this.fb.group({
      maximumStorypoint: [''],
    });
    if(this.sprintService.getMaximumStoryPoint()){
         this.sprinForm.get('maximumStorypoint')?.setValue(this.sprintService.getMaximumStoryPoint())
    }
   
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.cd.detectChanges();
  }
  onSave() {
    this.sprintService.setActiveSprintStories(this.activeSprint) 
    this.sprintService.setBackLogStories(this.backLog)
    this.sprintService.setMaximumStoryPoints(this.sprinForm.value.maximumStorypoint) 
    this.sprintService.setTotalStoryPoints(this.totalSprintPoint) 

  }
  // Method to add stories from backlog to active sprint
  autoAddToActiveSprint(maxStoryPoints: number) {
    // Sort backlog by story points in ascending order
    this.backLog.sort(
      (a: any, b: any) => parseInt(a.storypoint) - parseInt(b.storypoint)
    );

    // Move stories from backlog to active
    while (this.totalSprintPoint < maxStoryPoints && this.backLog.length > 0) {
      const nextStory: any = this.backLog[0];
      const nextStoryPoints = parseInt(nextStory.storypoint);

      if (this.totalSprintPoint + nextStoryPoints <= maxStoryPoints) {
        let story: any = this.backLog.shift();
        this.activeSprint.push(story);
        this.totalSprintPoint += nextStoryPoints;
      } else {
        break;
      }
    }
  }

  // Method to remove stories from active sprint to backlog
  autoRemoveFromActiveSprint(maxStoryPoints: number) {
    // Sort active sprint by story points in descending order
    this.activeSprint.sort(
      (a: any, b: any) => parseInt(b.storypoint) - parseInt(a.storypoint)
    );

    // Move stories from active to backlog
    while (
      this.totalSprintPoint > maxStoryPoints &&
      this.activeSprint.length > 0
    ) {
      const lastStory: any = this.activeSprint[this.activeSprint.length - 1];
      const lastStoryPoints = parseInt(lastStory.storypoint);
      let story: any = this.activeSprint.pop();
      this.backLog.push(story);
      this.totalSprintPoint -= lastStoryPoints;
    }
  }

  onAutoSelect() {
    if (this.sprinForm.valid) {
      const maxStoryPoints =  parseInt(this.sprinForm.value.maximumStorypoint);
      this.totalSprintPoint = this.activeSprint.reduce(
        (sum, story) => sum + parseInt(story.storypoint),
        0
      );

      if (this.totalSprintPoint < maxStoryPoints) {
        this.autoAddToActiveSprint(maxStoryPoints);
   
      } else if (this.totalSprintPoint > maxStoryPoints) {
        this.autoRemoveFromActiveSprint(maxStoryPoints);
  

        // If still exceeding after removal, attempt to add more stories to active sprint
        if (this.totalSprintPoint < maxStoryPoints) {
          this.autoAddToActiveSprint(maxStoryPoints);
       
        }
      }
      if (this.totalSprintPoint > maxStoryPoints) {
        this.openSnackBar(
          'Sprint is already saturated and cannot be adjusted further',
          'close'
        );
      }
    } else {
      this.sprinForm.markAllAsTouched();
    }
  }

  onClearSprint() {
    this.backLog = [...this.backLog, ...this.activeSprint];
    this.activeSprint = [];
    this.totalSprintPoint = 0;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 2000);
  }
  hasServerError(formControlName: string) {
    return this.sprinForm.hasError('serverError', formControlName);
  }
  getServerError(formControlName: string) {
    return this.sprinForm.getError('serverError', formControlName);
  }
}
