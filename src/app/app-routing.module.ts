import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HelloComponent } from './components/hello/hello.component'
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component'
import { ProfileDataComponent } from './components/profile/profile-data/profile-data.component'
import { TPsideBarComponent } from './components/TurboPuszka/tpside-bar/tpside-bar.component';
import { ShootingRangeComponent } from './components/shootingRange/shooting-range/shooting-range.component';
import { ShootingRangeListComponent } from './components/shootingRange/shooting-range-list/shooting-range-list.component';
import { ShootingRangeEditComponent } from './components/shootingRange/shooting-range-edit/shooting-range-edit.component';
import { CompetitionMenuComponent } from './components/competition/competition-menu/competition-menu.component';
import { TargetCreateComponent } from './components/target/target-create/target-create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/hello' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path: 'hello', component: HelloComponent},
  { path: 'confirmation/:id', component: ConfirmationComponent},
  { path: 'profile/security', component: ProfileSecurityComponent},
  { path: 'profile/data', component: ProfileDataComponent},
  { path: 'competition/organization', component: CompetitionMenuComponent},
  { path: 'shootingRange/create', component: ShootingRangeComponent},
  { path: 'shootingRange/list', component: ShootingRangeListComponent},
  { path: 'shootingRange/edit/:id', component: ShootingRangeEditComponent},
  { path: 'targets/create', component: TargetCreateComponent},
  { path: 'turboPuszka/sideBarMenu', component: TPsideBarComponent}

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ArrayOfComponents = [
  HelloComponent
]
