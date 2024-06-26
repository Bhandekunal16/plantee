import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileManagementService {
  constructor() {}

  downloadCSV(csvData: any, filename: any) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }
}
