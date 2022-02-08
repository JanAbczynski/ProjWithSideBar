import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HelloComponent } from './components/hello/hello.component'
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component'
import { ProfileDataComponent } from './components/profile/profile-data/profile-data.component'
import { CompetitionMenuComponent } from './components/competition-menu/competition-menu.component';
import { ShootingRangeComponent } from './components/shooting-range/shooting-range.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/hello' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path: 'hello', component: HelloComponent},
  { path: 'confirmation/:id', component: ConfirmationComponent},
  { path: 'profile/security', component: ProfileSecurityComponent},
  { path: 'profile/data', component: ProfileDataComponent},
  { path: 'competition/organization', component: CompetitionMenuComponent},
  { path: 'shootingRange/create', component: ShootingRangeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ArrayOfComponents = [
  HelloComponent
]
