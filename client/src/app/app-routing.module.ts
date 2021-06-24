import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResidentsListComponent } from './components/residents-list/residents-list.component';
import { AddResidentsComponent } from './components/add-residents/add-residents.component';
import { EditResidentComponent } from './components/edit-resident/edit-resident.component';
import { ViewResidentComponent } from './components/view-resident/view-resident.component';



const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'residents-list' },
{ path: 'residents-list', component: ResidentsListComponent },
{ path: 'add-resident', component: AddResidentsComponent },
{ path: 'edit-resident/:id', component: EditResidentComponent },
{ path: 'view-resident/:id', component: ViewResidentComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
