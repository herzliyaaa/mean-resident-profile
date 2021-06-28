import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ResidentService } from '../../service/resident.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-residents',
  templateUrl: './add-residents.component.html',
  styleUrls: ['./add-residents.component.css']
})
export class AddResidentsComponent implements OnInit {
  preview: string;
  submitted: true;
  residentForm!: FormGroup;
  
  GenderProfile: any = ['Male', 'Female'];
  CivilStatusProfile: any = ['Single', 'Married', 'Widowed'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private residentService: ResidentService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.residentForm = this.fb.group({
      imageFile : ['', [ Validators.required]],
      first_name: ['', [ Validators.required]],
      middle_name: ['', [ Validators.required]],
      last_name: ['', [ Validators.required]],
      birth_date: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
      civil_status: ['', [ Validators.required]],
      occupation: ['', [ Validators.required]],
      email: ['',[ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      sex: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.residentForm.get('sex').setValue(e, {
      onlySelf: true
    })
  }

  civil_statusProfile(e) {
    this.residentForm.get('civil_status').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get addForm() {
    return this.residentForm.controls;
  }


// // Image Preview
uploadFile(event) {
  const file = event.target.files[0];
  this.residentForm.patchValue({
    imageFile: file
  });
  this.residentForm.get('imageFile').updateValueAndValidity()

  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.preview = reader.result as string;
  }
  reader.readAsDataURL(file)
}



  onSubmit() {
    this.submitted = true;
    if (!this.residentForm.valid) {
      return false;
    } else {
      this.residentService.createResident(this.residentForm.value).subscribe(
        (res) => {
          console.log('Resident successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/residents-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}

