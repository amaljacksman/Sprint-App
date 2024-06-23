import { ChangeDetectorRef, Component } from '@angular/core';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss'],
})
export class StoryFormComponent {
  menuType = [
    {
      displayName: 'Create Sprint',
      click: () => {
       this.router.navigate(['/sprint/create-sprint'])
      },
    },
  ];
  storyForm!: FormGroup
  constructor(private sprintService: SprintService, private fb :FormBuilder, private cd :ChangeDetectorRef, private router :Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.storyForm = this.fb.group({
      storyName : [''],
      storypoint : ['']
    })
    
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.cd.detectChanges()
  }
 onSave(){
const allStories =[
  ...this.sprintService.getActiveSprintStories(),
  ...this.sprintService.getBacklogStories()
]
 const storeExist =  allStories.some(story => story.storyName.toLowerCase() === this.storyForm.value.storyName.toLowerCase());
 if(!storeExist)
  { 
    this.sprintService.getBacklogStories().push(this.storyForm.value)
    this.router.navigate(['/sprint/create-sprint'])
  }
  else this.storyForm.get('storyName')?.setErrors({ serverError: 'Story Already Exists' })
 
 }

  hasServerError(formControlName : string) {
    return this.storyForm.hasError('serverError', formControlName);
  }
  getServerError(formControlName: string) {
    return this.storyForm.getError('serverError', formControlName);
  }
}
