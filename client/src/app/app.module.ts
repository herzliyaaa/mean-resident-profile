import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ResidentsListComponent } from './components/residents-list/residents-list.component';
import { AddResidentsComponent } from './components/add-residents/add-residents.component';
import { EditResidentComponent } from './components/edit-resident/edit-resident.component';

import { ResidentService } from './service/resident.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewResidentComponent } from './components/view-resident/view-resident.component';


@NgModule({
  declarations: [
    AppComponent,
    ResidentsListComponent,
    AddResidentsComponent,
    EditResidentComponent,
    SidebarComponent,
    ViewResidentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ResidentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
