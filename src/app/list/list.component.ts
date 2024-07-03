import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, switchMap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FileManagementService } from '../file-management.service';
import { Message } from 'primeng/api';
import { NotificationService } from '../notification.service';
import { NetworkService } from '../network.service';
import { promises } from 'node:dns';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  public products: any[] = [];
  public myForm: FormGroup;
  public flag: boolean = false;
  public flag2: boolean = false;
  public flag3: boolean = false;
  public msg: Message[] | any;
  public isOnline: boolean | any;

  constructor(
    private http: HttpClient,
    private route: Router,
    private file: FileManagementService,
    private notification: NotificationService,
    private networkService: NetworkService
  ) {
    this.myForm = new FormGroup({
      family: new FormControl(''),
      scientfiicname: new FormControl(''),
      genus: new FormControl(''),
    });
  }

  public selector(): void {
    const [family, scientfiicname, genus]: [string, string, string] = [
      this.myForm.get('family')?.value,
      this.myForm.get('scientfiicname')?.value,
      this.myForm.get('genus')?.value,
    ];

    if (family !== '') {
      [this.flag2, this.flag3] = [true, true];
      this.findWithFamily({ name: family }).subscribe((ele) => {
        this.products = ele.data;
      });
    } else if (scientfiicname !== '') {
      [this.flag, this.flag3] = [true, true];
      this.findWithSpe({ name: scientfiicname }).subscribe((ele) => {
        this.products = ele.data;
      });
    } else if (genus !== '') {
      [this.flag, this.flag2] = [true, true];
      this.findWithGenus({ name: genus }).subscribe((ele) => {
        this.products = ele.data;
      });
    } else this.resetFlags();
  }

  public resetFlags() {
    [this.flag, this.flag2, this.flag3] = [false, false, false];
  }

  ngOnInit(): void {
    this.networkService.onlineStatus$.subscribe((status) => {
      this.isOnline = status;
    });

    this.customerUnsubscribed().subscribe(
      (ele) => {
        this.products = ele.data;
      },
      (error) => {
        this.msg = [
          this.notification.error(
            ` ${this.isOnline ? 'your are online' : 'your are offline'}`
          ),
        ];
      }
    );
  }

  async view(id: any): Promise<void> {
    localStorage.setItem('Name', id);
    await this.home();
  }

  private home(): void {
    this.route.navigate(['/view']);
  }

  private findWithFamily(body: any): Observable<any> {
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

  private findWithGenus(body: any): Observable<any> {
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

  private findWithSpe(body: any): Observable<any> {
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

  private customerUnsubscribed(): Observable<any> {
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

  public arrayToCSV(): void {
    const csvRows = [];
    const headers = Object.keys(this.products[0]);
    csvRows.push(headers.join(','));

    for (const row of this.products) {
      const values = headers.map((header) => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    this.file.downloadCSV(csvRows.join('\n'), 'download.csv');
  }
}
