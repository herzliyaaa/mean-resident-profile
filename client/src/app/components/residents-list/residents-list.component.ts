import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Resident } from '../../interface/Resident';
import { Router } from "@angular/router";
import { ResidentService } from '../../service/resident.service';


@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html',
  styleUrls: ['./residents-list.component.css']
})
export class ResidentsListComponent implements OnInit {

  Resident: Resident[] = [];

  dataSource: MatTableDataSource<Resident>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['first_name', 'middle_name','last_name', 'birth_date', 'sex', 'phone_number', 'actions'];

  constructor(private residentService: ResidentService, private router: Router
  ) {

  }

  ngOnInit() {

    this.readResident();
  }

  readResident() {
    this.residentService.getResidents().subscribe((data: Resident[]) => {
      this.Resident = data;
      this.dataSource = new MatTableDataSource<Resident>(this.Resident);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);

    })
  }

  removeResident(resident: { _id: string; }, index: any) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.residentService.deleteResident(resident._id).subscribe()

    }
  }

}


