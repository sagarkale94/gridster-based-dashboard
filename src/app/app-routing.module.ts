import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrepareLayoutComponent } from './prepare-layout/prepare-layout.component';
import { FinalLayoutComponent } from './final-layout/final-layout.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/prepare-layout'
  },
  {
    path:'prepare-layout',
    component:PrepareLayoutComponent
  },
  {
    path:'final-layout',
    component:FinalLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }