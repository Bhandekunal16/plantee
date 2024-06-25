import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  async encrypt(data: any) {
    const response = await fetch(
      `https://encryption-server.vercel.app/encrypt`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey: 'plantee',
          data: data,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const resData = await response.json();
    return resData;
  }

  async decrypt(data: any) {
    const response = await fetch(
      `https://encryption-server.vercel.app/decrypt`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey: 'plantee',
          data: data,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const resData = await response.json();
    return resData;
  }

  async setToLocalStorage() {
    try {
    } catch (error: any) {
      return new Error(error);
    }
  }
}
