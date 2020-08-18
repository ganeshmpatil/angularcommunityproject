import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageuploadserviceService {
  imageUploadPath: string = 'http://localhost:3000/image/upload';
  constructor(private http: HttpClient) {}

  imageUpload(imageForm) {
    return this.http.post(this.imageUploadPath, imageForm).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
