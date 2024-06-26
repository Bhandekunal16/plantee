import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private http: HttpClient, private encryption: EncryptionService) {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }

  async getter() {
    return;
  }

  ngOnInit() {
    // this.encryption
    //   .getFromLocalStorage('Name')
    //   .then((ele) => {
    //     if (ele && ele.decrypted) {
    //       try {
    //         const nameData = JSON.parse(ele.decrypted.replace(/'/g, '"')).data;

    //       } catch (error) {
    //         console.error('Error parsing JSON', error);
    //       }
    //     } else {
    //       console.error('No data found in localStorage');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error retrieving data from localStorage', error);
    //   });

    this.findWithSpe({ name: localStorage.getItem('Name') }).subscribe(
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
        }
      },
      (error) => {
        console.error('Error fetching data', error);
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
