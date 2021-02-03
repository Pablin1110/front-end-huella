import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './guards/auth.guard';
import {NologinGuard} from './guards/nologin.guard';

const routes: Routes = [
  //components
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule),
   canActivate: [NologinGuard] },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule),
  canActivate: [NologinGuard]},
  { path: 'reset-pass', loadChildren: () => import('./components/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule),
  canActivate: [NologinGuard]},
  //pages
  { path: 'principal', loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule),
  canActivate: [AuthGuard] },
  {path: 'tabs', loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule), canActivate: [AuthGuard] },
  {path: 'user', loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule), canActivate: [AuthGuard]},
  {path: 'results', loadChildren: () => import('./pages/results/results.module').then( m => m.ResultsPageModule), canActivate: [AuthGuard]},
  {path: 'organization', loadChildren: () => import('./pages/organization/organization.module').then( m => m.OrganizationPageModule),
  canActivate: [AuthGuard]},
  {path: 'scopeone',loadChildren: () => import('./pages/scopeone/scopeone.module').then( m => m.ScopeonePageModule),
  canActivate: [AuthGuard]},
  {path: 'scopetwo',loadChildren: () => import('./pages/scopetwo/scopetwo.module').then( m => m.ScopetwoPageModule)
  ,canActivate: [AuthGuard]},
  {path: 'carbon',loadChildren: () => import('./pages/carbon/carbon.module').then( m => m.CarbonPageModule),
  canActivate: [AuthGuard]},
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
