import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  debounceTime,
  switchMap,
  catchError,
  throwError,
} from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { EncryptionService } from '../encryption.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  public myForm: FormGroup;
  public flag: boolean = false;
  public msg: Message[] | any;
  public family: string | undefined = '';
  public genus: string | undefined;
  public scientfiicname: string | undefined;
  public subfamily: string | undefined;
  public subgenus: string | undefined;
  public tribe: string | undefined;
  public name: string | undefined;

  constructor(
    private http: HttpClient,
    private encryption: EncryptionService,
    private notification: NotificationService
  ) {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }

  ngOnInit() {
    localStorage.getItem('Name') == null
      ? (this.msg = [
          this.notification.error(
            `something went wrong to found data go back & come again in this page`
          ),
        ])
      : this.findWithSpe({ name: localStorage.getItem('Name') }).subscribe(
          (response) => {
            if (response && response.data && response.data.length > 0) {
              const data = response.data[0];
              this.family = data.family;
              this.genus = data.genus;
              this.scientfiicname = data.scientfiicname;
              this.subfamily = data.subfamily;
              this.tribe = data.tribe;
              this.subgenus = data.subgenus;
              this.name = data.name ?? '';
              this.msg = [
                this.notification.success(
                  `you get data of ${data.scientfiicname}`,
                  'Found'
                ),
              ];
            }
          },
          (error) => {
            console.error('Error fetching data', error);
            this.msg = [
              this.notification.error(`something went wrong in fetching data.`),
            ];
          }
        );
  }

  setter() {
    this.flag = true;
  }

  addRequest(): void {
    const [email, message]: [string, string] = [
      this.myForm.value.email,
      this.myForm.value.message,
    ];

    const array : Array<any> = [
      {
        email: email,
        message: `"Your message has been received successfully. We will take a few days to study the topic. If we find it to be accurate, we will add it to our portal."`,
        notificationMessage: `your message sent successfully`,
        notificationType: 'success',
      },
      {
        email: 'roboticdev07@gmail.com',
        message: `"This is the message: ${message}, from the sender: ${email}, and it is sent for ${this.scientfiicname}."`,
        notificationMessage: `your message received successfully`,
        notificationType: 'success',
      },
    ];

    array.map((ele) => {
      this.email({
        to: ele.email,
        message: ele.message,
      }).subscribe((res) => {
        this.msg = [
          this.notification.success(
            ele.notificationMessage,
            ele.notificationType
          ),
        ];
      });
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
