import { Component, OnInit } from '@angular/core';
import { Resident } from '../../interface/Resident';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidentService } from '../../service/resident.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-resident',
  templateUrl: './edit-resident.component.html',
  styleUrls: ['./edit-resident.component.css'],
})
export class EditResidentComponent implements OnInit {
  preview: string;
  visible = true;
  submitted = false;
  editForm!: FormGroup;
  residentData!: Resident[];
  GenderProfile: any = ['Male', 'Female'];
  CivilStatusProfile: any = ['Single', 'Married', 'Widowed'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private residentService: ResidentService,
    private router: Router,
    private location: Location

  ) { }

  ngOnInit() {
    this.updateResident();
    let id = this.actRoute.snapshot.paramMap.get('id');

    this.getResident(id);
    this.editForm = this.fb.group({
      imageFile: [null, Validators.required],
      first_name: ['', [Validators.required]],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      address: ['', [Validators.required]],
      civil_status: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      email: [
        '',
        [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
      ],
      sex: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('sex').setValue(e, {
      onlySelf: true,
    });
  }

  civil_statusProfile(e) {
    this.editForm.get('civil_status').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getResident(id: string) {
    this.residentService.getResident(id).subscribe((data: any) => {
      this.editForm.setValue({
        imageFile: data['imageFile'],
        first_name: data['first_name'],
        middle_name: data['middle_name'],
        last_name: data['last_name'],
        birth_date: data['birth_date'],
        address: data['address'],
        civil_status: data['civil_status'],
        occupation: data['occupation'],
        email: data['email'],
        sex: data['sex'],
        phone_number: data['phone_number'],
      });
    });
  }

  // getImage() {
  //   this.residentService.getImage(imageFile).subscribe((file: any) => {
  //     this.editForm.setValue({
  //        imageFile: file['imageFile']
  //     });
  //   });
  // }

  updateResident() {
    this.editForm = this.fb.group({
      // imageFile : [null, Validators.required],
      first_name: ['', [Validators.required]],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      address: ['', [Validators.required]],
      civil_status: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      email: [
        '',
        [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
      ],
      sex: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }


  goBack() {
    this.location.back();
  }


  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.residentService
          .updateResident(id, this.editForm.value)
          .subscribe(
            (res) => {
              this.router.navigateByUrl('/residents-list');
              console.log('Content updated successfully!');
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }
}
