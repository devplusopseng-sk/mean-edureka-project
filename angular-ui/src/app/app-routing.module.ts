import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/public/register/register.component';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/secure/home/home.component';
import { NetworkComponent } from './pages/secure/network/network.component';
import { FriendsComponent } from './pages/secure/friends/friends.component';
import { SettingComponent } from './pages/secure/setting/setting.component';
import { UploadProfilePhotoComponent } from './pages/secure/upload-profile-photo/upload-profile-photo.component';
import { UsersComponent } from './pages/secure/users/users.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ForgotPasswordComponent } from './pages/public/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'network', component: NetworkComponent, canActivate: [AuthGuardService] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuardService] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuardService] },
  { path: 'upload/pp', component: UploadProfilePhotoComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
