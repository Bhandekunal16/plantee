import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, switchMap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule, TableModule, CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  public products: any[] = [];
  public myForm: FormGroup;
  public flag: boolean = false;
  public flag2: boolean = false;
  public flag3: boolean = false;

  constructor(private http: HttpClient, private route: Router) {
    this.myForm = new FormGroup({
      family: new FormControl(''),
      scientfiicname: new FormControl(''),
      genus: new FormControl(''),
    });
  }

  selector(): void {
    const [family, scientfiicname, genus]: [string, string, string] = [
      this.myForm.get('family')?.value,
      this.myForm.get('scientfiicname')?.value,
      this.myForm.get('genus')?.value,
    ];

    if (family !== '') {
      this.flag2 = true;
      this.flag3 = true;
      this.findWithFamily({ name: family }).subscribe((ele) => {
        this.products = ele.data;
      });
    } else if (scientfiicname !== '') {
      this.flag = true;
      this.flag3 = true;
      this.findWithSpe({ name: scientfiicname }).subscribe((ele) => {
        this.products = ele.data;
      });
    } else if (genus !== '') {
      this.flag = true;
      this.flag2 = true;
      this.findWithGenus({ name: genus }).subscribe((ele) => {
        this.products = ele.data;
      });
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

  view(id: any): void {
    this.home();
    localStorage.setItem('name', id);
  }

  home(): void {
    this.route.navigate(['/view']);
  }

  findWithFamily(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'https://townhall-ten.vercel.app/plant/getByFamilyName',
        body,
        { headers }
      )
      .pipe(
        debounceTime(300),
        switchMap(() =>
          this.http.post<any>(
            'https://townhall-ten.vercel.app/plant/getByFamilyName',
            body,
            { headers }
          )
        )
      );
  }

  findWithGenus(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'https://townhall-ten.vercel.app/plant/getCollectionByGenusName',
        body,
        { headers }
      )
      .pipe(
        debounceTime(300),
        switchMap(() =>
          this.http.post<any>(
            'https://townhall-ten.vercel.app/plant/getCollectionByGenusName',
            body,
            { headers }
          )
        ),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  findWithSpe(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'https://townhall-ten.vercel.app/plant/getCollectionByScientificName',
        body,
        { headers }
      )
      .pipe(
        debounceTime(300),
        switchMap(() =>
          this.http.post<any>(
            'https://townhall-ten.vercel.app/plant/getCollectionByScientificName',
            body,
            { headers }
          )
        ),
        catchError((error) => {
          return throwError(error);
        })
      );
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
