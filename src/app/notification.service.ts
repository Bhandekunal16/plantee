import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  success(input: any, summary: any) {
    return {
      severity: 'success',
      summary: summary == undefined ? 'success' : summary,
      detail: input,
    };
  }

  error(input: any) {
    return {
      severity: 'error',
      summary: 'error',
      detail: input,
    };
  }
}
