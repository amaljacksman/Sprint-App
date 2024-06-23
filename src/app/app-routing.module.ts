import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [

{ path :'' ,component: HeaderComponent, 

children:[
  {
    path :'sprint' ,
    loadChildren: () => import('./sprint/sprint.module').then((m) => m.SprintModule),
  },
   { path: '', redirectTo: '/sprint', pathMatch: 'full' },
]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
