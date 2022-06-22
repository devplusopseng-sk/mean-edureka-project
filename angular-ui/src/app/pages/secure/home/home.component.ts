import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: any;

  posts: any;

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
    this.getPostsByUserId();
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

  submitPost() {
    console.log('Inside submitPost');
    let request = {
      post: this.post,
      userId: this.sharedService.authDetails._id,
      userName: this.sharedService.authDetails.firstName +' '+ this.sharedService.authDetails.lastName,
      userPhotoId: this.sharedService.authDetails.photoId,
      postImageId: this.imageBase64
    }
    let tempBase64 = this.imageBase64;

    this.apiCalls.createPost(request).subscribe(
      res => {
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          this.getPostsByUserId();
          window.scrollTo(0, 0);
          this.errorService.addError({
            msg: 'Successfully created/submitted the post.',
            type: 'success', closable: true
          });
        }
      },
      error => {
      },
    );

  }

  getPostsByUserId() {
    console.log('Inside getMasters');
      this.apiCalls.getPostByUserId(this.sharedService.authDetails._id).subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.posts = resp.body;
          }
        },
        error => {

        }
      );
  }

}

