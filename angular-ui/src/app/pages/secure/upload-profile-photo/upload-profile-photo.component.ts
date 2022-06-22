import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-upload-profile-photo',
  templateUrl: './upload-profile-photo.component.html',
  styleUrls: ['./upload-profile-photo.component.css']
})
export class UploadProfilePhotoComponent implements OnInit {

  imageId: any = '';
  imageFile: any;
  imageFileError: any;
  imageBase64: any;
  imageFormatType: any;

  MAX_FILE_SIZE = 5 * 1024 * 1024;

  constructor(
    public sharedService: SharedService,
    private errorService: ErrorServiceService,
    private apiCalls: ApiCallsService,
    private imageCompress: NgxImageCompressService,
  ) { }

  ngOnInit(): void {
  }

  async uploadImg(event: any): Promise<void> {
    console.log('Inside uploadImg');
    this.imageFileError = '';
    this.imageId = '';
    if (event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];
      const checkIfMultiExtns = file.name.split('.').length === 2 ? false : true;
      const fileType = file.name.slice((Math.max(0, file.name.lastIndexOf('.')) || Infinity) + 1);
      const fileName = file.name.split('.')[0];

      console.log(fileType);

      if (checkIfMultiExtns) {
        this.imageFileError = 'File name with multiple extensions not allowed.';
        event.srcElement.value = null;
        this.imageId = '';
        this.imageFile = '';

      } else {
        if (!['jpeg', 'jpg', 'png'].includes(fileType.toLowerCase())) {
          this.imageFileError = 'Please upload jpeg, jpg, png, pdf files only.';
          event.srcElement.value = null;
          this.imageId = '';
          this.imageFile = '';

        } else {
          if (file.size > this.MAX_FILE_SIZE) {
            const formatBytes = '5 MB';
            this.imageFileError = 'Maximum file upload size limit is ' + formatBytes + '.';
            event.srcElement.value = null;
            this.imageId = '';
            this.imageFile = '';

          } else {
            const base64 = await this.getBase64(file);
            const compressBase64 = await this.compressImgFile(base64); // it uses image compression mechanism
            this.imageBase64 = compressBase64;

            this.imageFormatType = fileType;
            await this.docUploadAPI();
          }
        }
      }
    } else {
      console.log('inside else uploadImg');
    }
  }

  getBase64(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('inside onload');
        // console.log((reader.result as string));
        // console.log((reader.result as string).split(',')[1]);
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  compressImgFile(imageBase64: any) {
    console.log('Before compress Size in bytes:', this.imageCompress.byteCount(imageBase64));
    return new Promise((resolve) => {
      this.imageCompress.compressFile(imageBase64, 1, 50, 50).then(
        (result: any) => {
          console.log('After compress Size in bytes:', this.imageCompress.byteCount(result));
          resolve(result);
        });
    });
  }

  docUploadAPI() {
    console.log('Inside docUploadAPI');
    let request = {
      id: this.sharedService.authDetails._id,
      docBase64: this.imageBase64,
      photoId: this.sharedService.authDetails.photoId
    }
    let tempBase64 = this.imageBase64;

    this.apiCalls.updateuserphotoId(request).subscribe(
      res => {
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          this.getUser();
          this.getMasters();
          window.scrollTo(0, 0);
          this.errorService.addError({
            msg: 'Successfully uploaded the profile picture.',
            type: 'success', closable: true
          });
        }
      },
      error => {
      },
    );

  }

  getUser() {
    console.log('Inside getUser');
      this.apiCalls.getUserById(this.sharedService.authDetails._id).subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.sharedService.authDetails.photoId = resp.body.photoId;
          }
        },
        error => {

        }
      );
  }

  getMasters() {
    console.log('Inside getMasters');
      this.apiCalls.masters().subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.sharedService.ppMasters = resp.body;
          }
        },
        error => {

        }
      );
  }

}
