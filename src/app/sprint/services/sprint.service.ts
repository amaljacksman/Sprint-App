import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
initialData = {
  activeSprint: {
    totalStoryPoints: 4,
    maximumStoryPoints:4,
    stories: [
      {
        storyName: 'Implement user login',
        storypoint: '1',
      },
      {
        storyName: 'Create landing page',
        storypoint: '2',
      },
      {
        storyName: 'Set up database',
        storypoint: '1',
      },
    ],
  },
  backLog: {
    stories: [
      {
        storyName: 'Develop user profile',
        storypoint: '3',
      },
      {
        storyName: 'Integrate payment gateway',
        storypoint: '5',
      },
      {
        storyName: 'Design admin dashboard',
        storypoint: '2',
      },
    ],
  },
}

getBacklogStories(){
  return this.initialData.backLog.stories
}
getActiveSprintStories(){
  return this.initialData.activeSprint.stories
}
getTotalStoryPoint(){
  return this.initialData.activeSprint.totalStoryPoints
}
getMaximumStoryPoint(){
  return this.initialData.activeSprint.maximumStoryPoints
}
setBackLogStories(backlog :any ){
  this.initialData.backLog.stories = [...backlog]
}
setActiveSprintStories (activeSprint :any){
  this.initialData.activeSprint.stories = [...activeSprint]
}
setTotalStoryPoints(number:any){
  this.initialData.activeSprint.totalStoryPoints = number
}
setMaximumStoryPoints(number:any){
  this.initialData.activeSprint.maximumStoryPoints = number
}
  
}
