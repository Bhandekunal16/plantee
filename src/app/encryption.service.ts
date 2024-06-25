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

  async setToLocalStorage(key: any, input: any): Promise<any> {
    try {
      const convert = await this.encrypt(input);
      localStorage.setItem(key, convert);
    } catch (error: any) {
      return new Error(error);
    }
  }

  async getFromLocalStorage(key: any): Promise<any> {
    try {
      const normal = localStorage.getItem(key);
      return await this.decrypt(normal);
    } catch (error: any) {
      return new Error(error);
    }
  }
}
