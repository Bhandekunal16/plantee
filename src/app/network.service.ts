import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);
  onlineStatus$ = this.onlineStatus.asObservable();

  constructor() {
    this.updateNetworkStatus(navigator.onLine);
    setInterval(() => {
      this.checkNetworkStatus();
    }, 60000);
  }

  private checkNetworkStatus() {
    const isOnline = navigator.onLine;
    this.updateNetworkStatus(isOnline);
  }

  private updateNetworkStatus(isOnline: boolean) {
    this.onlineStatus.next(isOnline);
  }
}
