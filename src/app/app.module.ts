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
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidebarPageComponent } from './components/sidebar-page/sidebar-page.component';
import {HeaderComponent} from './components/header/header.component'
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

import { ToastrModule } from 'ngx-toastr';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    SidebarPageComponent,
    HeaderComponent,
    LoginDialogComponent,
  ],
  entryComponents: [LoginDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    MaterialModule,
    FlexLayoutModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: pl_PL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
