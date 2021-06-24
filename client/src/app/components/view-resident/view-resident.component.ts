import { Component, OnInit } from '@angular/core';



import { Resident } from '../../interface/Resident';
import { Router, ActivatedRoute} from "@angular/router";
import { ResidentService } from '../../service/resident.service';

@Component({
  selector: 'app-view-resident',
  templateUrl: './view-resident.component.html',
  styleUrls: ['./view-resident.component.css']
})
export class ViewResidentComponent implements OnInit {

//    Residents: any = [];

//   constructor(private residentService: ResidentService,    private actRoute: ActivatedRoute,) {
   
 ngOnInit() {  
  }

// getResident(id: string) {
//   this.residentService.getResident(id).subscribe((data: any) => {

//   });
// }
//   }
}