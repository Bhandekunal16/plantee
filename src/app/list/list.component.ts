import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule, TableModule, CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  products!: any[];
  public myForm: FormGroup;
  flag = false;
  flag2 = false;
  flag3 = false;

  constructor(private http: HttpClient) {
    this.myForm = new FormGroup({
      family: new FormControl(''),
      scientfiicname: new FormControl(''),
      genus: new FormControl(''),
    });
  }

  selector() {
    const family = this.myForm.get('family')?.value;
    const scientfiicname = this.myForm.get('scientfiicname')?.value;
    const genus = this.myForm.get('genus')?.value;

    console.log(family, scientfiicname, genus);

    if (family !== '') {
      this.flag2 = true;
      this.flag3 = true;
    } else if (scientfiicname !== '') {
      this.flag = true;
      this.flag3 = true;
    } else if (genus !== '') {
      this.flag = true;
      this.flag2 = true;
    } else {
      this.flag = false;
      this.flag2 = false;
      this.flag3 = false;
    }
  }

  ngOnInit(): void {
    this.customerUnsubscribed().subscribe((ele) => {
      this.products = ele.data;
    });
  }
  customerUnsubscribed(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<any>(`https://townhall-ten.vercel.app/plants/species`, { headers })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
