import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest} from '@angular/common/http';
import { Resident } from '../interface/Resident';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // addGallery(gallery: Gallery, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('imageTitle', gallery.imageTitle);
  //   formData.append('imageDesc', gallery.imageDesc);
  //   const header = new HttpHeaders();
  //   const params = new HttpParams();

  //   const options = {
  //     params,
  //     reportProgress: true,
  //     headers: header
  //   };
  //   const req = new HttpRequest('POST', apiUrl, formData, options);
  //   return this.http.request(req);
  // }

  // Create
  createResident(data: Resident): Observable<Resident[]> {
    const url = `${this.baseUri}/create`;
    const formData = new FormData();
    formData.append('imageFile', data.imageFile);
    formData.append('first_name', data.first_name);
    formData.append('middle_name', data.middle_name);
    formData.append('last_name', data.last_name);
    formData.append('birth_date', data.birth_date);
    formData.append('address', data.address);
    formData.append('civil_status', data.civil_status);
    formData.append('sex', data.sex);
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);
    formData.append('occupation', data.occupation);

    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };

    return this.http
      .post<Resident[]>(url, formData, options)
      .pipe(catchError(this.errorMgmt));
  }

  // Get all employees
  getResidents(): Observable<Resident[]> {
    return this.http.get<Resident[]>(`${this.baseUri}`);
  }

  // getImage(file:File) : Observable<Resident[]>  {
  //   return this.http.get<Resident[]>(`${file}`);
  // }


  // Get employee
  getResident(id: string): Observable<Resident[]> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http
      .get<Resident[]>(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Update employee
  updateResident(id: string, data: string): Observable<Resident[]> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put<Resident[]>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete employee
  deleteResident(id: string): Observable<Resident[]> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete<Resident[]>(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }



  deleteAllResident(): Observable<Resident[]> {
    return this.http.delete<Resident[]>(`${this.baseUri}/delete/`);
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
