import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pl_PL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, ArrayOfComponents  } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidebarPageComponent } from './components/sidebar-page/sidebar-page.component';
import {HeaderComponent} from './components/header/header.component'
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component'

import { ToastrModule } from 'ngx-toastr';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProfileDataComponent } from './components/profile/profile-data/profile-data.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule  } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
import { CompetitionMenuComponent } from './components/competition-menu/competition-menu.component';
import { ShootingRangeComponent } from './components/shooting-range/shooting-range.component';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    SidebarPageComponent,
    HeaderComponent,
    LoginDialogComponent,
    ConfirmationComponent,
    ProfileSecurityComponent,
    ProfileDataComponent,
    CompetitionMenuComponent,
    ShootingRangeComponent,
    ArrayOfComponents
  ],
  entryComponents: [LoginDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    MaterialModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pl_PL }, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
