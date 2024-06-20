import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
  debounceTime,
  switchMap,
  catchError,
  throwError,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public family: string | undefined = '';
  public genus: string | undefined;
  public scientfiicname: string | undefined;
  public subfamily: string | undefined;
  public subgenus: string | undefined;
  public tribe: string | undefined;
  public name: string | undefined;

  ngOnInit(): void {
    this.findWithSpe({ name: localStorage.getItem('name') }).subscribe(
      (ele) => {
        console.log(ele);

        this.family = ele.data[0].family;
        this.genus = ele.data[0].genus;
        this.scientfiicname = ele.data[0].scientfiicname;
        this.subfamily = ele.data[0].subfamily;
        this.tribe = ele.data[0].tribe;
        this.subgenus = ele.data[0].subgenus;
        this.name = ele.data[0].name == undefined ? '' : ele.data[0].name;
      }
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
}