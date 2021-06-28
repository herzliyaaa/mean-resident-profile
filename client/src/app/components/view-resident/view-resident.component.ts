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

Resident: Resident[] = [];



constructor(private residentService: ResidentService, private actRoute: ActivatedRoute,  public router: Router) {}
   
 ngOnInit() 
 
 {    
  let id = this.actRoute.snapshot.paramMap.get('id');
  this.getResidentDetails(id);
  
     
  }


getResidentDetails(_id:string) {
  this.residentService.getResident(_id).subscribe ((data: Resident[]) => {
    this.Resident = data;
  })
}

}

