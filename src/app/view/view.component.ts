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
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  public myForm: FormGroup;
  public flag: boolean = false;
  public msg: Message[] | any;

  constructor(private http: HttpClient) {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }

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

  setter() {
    this.flag = true;
  }

  addRequest(): void {
    const email: any = this.myForm.value.email;
    const message: any = this.myForm.value.message;

    this.email({
      to: email,
      message: `"Your message has been received successfully. We will take a few days to study the topic. If we find it to be accurate, we will add it to our portal."`,
    }).subscribe((ele) => {
      this.msg = [
        {
          severity: 'success',
          summary: 'success',
          detail: `your message sent successfully`,
        },
      ];
    });
    this.email({
      to: 'roboticdev07@gmail.com',
      message: `"This is the message: ${message}, from the sender: ${email}, and it is sent for ${this.scientfiicname}."`,
    }).subscribe((ele) => {
      this.msg = [
        {
          severity: 'success',
          summary: 'success',
          detail: `your message sent successfully`,
        },
      ];

      if (ele.success) {
        setInterval(() => {
          window.location.reload();
        }, 3000);
      }
    });
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

  email(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'https://mailer-service-eight.vercel.app/message/send-email',
        body,
        { headers }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
