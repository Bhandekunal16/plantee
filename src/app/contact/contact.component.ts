import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { Message } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  public myForm: FormGroup;
  public msg: Message[] | any;

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }

  public submit(): void {
    const [email, message]: [any, any] = [
      this.myForm.value.email,
      this.myForm.value.message,
    ];

    const emailArray = [email, 'roboticdev07@gmail.com'];
    const messageArray = [
      `your message received successfully.`,
      `this is message : ${message}, sender : ${email}`,
    ];
    const subscribeMessage = [
      `your message sent successfully`,
      `your message received by us successfully`,
    ];
    const subscribeStatus = ['success', 'success'];

    for (let index = 0; index < emailArray.length; index++) {
      this.email({
        to: emailArray[index],
        message: messageArray[index],
      }).subscribe((ele) => {
        this.msg = [
          this.notification.success(
            subscribeMessage[index],
            subscribeStatus[index]
          ),
        ];
      });
    }

    // Promise.all([
    //   this.email({
    //     to: email,
    //     message: `your message received successfully.`,
    //   }).subscribe((ele) => {
    //     this.msg = [
    //       this.notification.success(
    //         `your message sent successfully`,
    //         'success'
    //       ),
    //     ];
    //   }),
    //   this.email({
    //     to: 'roboticdev07@gmail.com',
    //     message: `this is message : ${message}, sender : ${email}`,
    //   }).subscribe((ele) => {
    //     this.msg = [
    //       this.notification.success(
    //         `your message received by us successfully`,
    //         'success'
    //       ),
    //     ];

    //     if (ele.success)
    //       setInterval(() => {
    //         window.location.reload();
    //       }, 3000);
    //   }),
    // ]);
  }

  private email(body: any): Observable<any> {
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
