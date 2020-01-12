import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFileComponent } from './view-file/view-file.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'view/:name', component: ViewFileComponent },
  { path: 'view/:name/:responseId', component: ViewFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
