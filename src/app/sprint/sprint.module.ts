import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintMainComponent } from './sprint-main/sprint-main.component';
import { StoryFormComponent } from './story-form/story-form.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ActiveSprintsComponent } from './active-sprints/active-sprints.component';
import { BackLogComponent } from './back-log/back-log.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';


@NgModule({
  declarations: [
    SprintMainComponent,
    StoryFormComponent,
    ActiveSprintsComponent,
    BackLogComponent,
    SprintFormComponent
  ],
  imports: [
    CommonModule,
    SprintRoutingModule ,
    HttpClientModule,
    SharedModule

  ]
})
export class SprintModule { }
