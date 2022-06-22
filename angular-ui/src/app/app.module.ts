import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from './material.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxLoadingModule } from 'ngx-loading';
import { ErrorServiceService } from './util/error/error-service.service';
import { ErrorComponent } from './util/error/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallsService } from './services/api-calls/api-calls.service';
import { SharedService } from './services/sharedService';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { HeaderComponent } from './layout/header/header.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/secure/home/home.component';
import { NetworkComponent } from './pages/secure/network/network.component';
import { FriendsComponent } from './pages/secure/friends/friends.component';
import { SettingComponent } from './pages/secure/setting/setting.component';
import { UploadProfilePhotoComponent } from './pages/secure/upload-profile-photo/upload-profile-photo.component';
import { ProfileSectionComponent } from './pages/secure/profile-section/profile-section.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { UsersComponent } from './pages/secure/users/users.component';
import { ForgotPasswordComponent } from './pages/public/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NetworkComponent,
    FriendsComponent,
    ProfileSectionComponent,
    SettingComponent,
    UploadProfilePhotoComponent,
    UsersComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    NgxLoadingModule,
    HttpClientModule
  ],
  providers: [
    ApiCallsService,
    SharedService,
    ErrorServiceService,
    AuthGuardService,
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
