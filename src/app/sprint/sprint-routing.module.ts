import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintMainComponent } from './sprint-main/sprint-main.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';

const routes: Routes = [
  { path: '',component : SprintMainComponent },
  { path: 'create-story',component : StoryFormComponent },
  { path: 'create-sprint',component : SprintFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
