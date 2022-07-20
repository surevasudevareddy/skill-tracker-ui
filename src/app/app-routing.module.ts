import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { UserAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"admin",canActivate:[AdminAuthGuard], loadChildren: ()=>import('./modules/admin/admin.module').then((a)=>a.AdminModule)},
  {path:'user/:userId',canActivate:[UserAuthGuard], loadChildren: ()=>import('./modules/user/user.module').then((u)=>u.UserModule)},
  {path:'**',component:LoginComponent,pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
