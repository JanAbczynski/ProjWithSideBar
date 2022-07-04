
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pl_PL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, ArrayOfComponents  } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidebarPageComponent } from './components/sidebar-page/sidebar-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component'

import { ToastrModule } from 'ngx-toastr';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProfileDataComponent } from './components/profile/profile-data/profile-data.component'
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule  } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatChipsModule } from '@angular/material/chips'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule} from '@angular/material/card'

import { HeaderComponent } from './components/header/header.component'
import { TPsideBarComponent } from './components/TurboPuszka/tpside-bar/tpside-bar.component';
import { YesOrNoComponent } from './components/yes-or-no/yes-or-no.component';
import { ShootingRangeComponent } from './components/shootingRange/shooting-range/shooting-range.component';
import { ShootingRangeListComponent } from './components/shootingRange/shooting-range-list/shooting-range-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShootingRangeFormComponent } from './components/shootingRange/shooting-range-form/shooting-range-form.component';
import { ShootingRangeEditComponent } from './components/shootingRange/shooting-range-edit/shooting-range-edit.component';
import { ShootingRangeViewComponent } from './components/shootingRange/shooting-range-view/shooting-range-view.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortPipe } from './share/pipes/sort.pipe';
import { CompetitionMenuComponent } from './components/competition/competition-menu/competition-menu.component';
import { ShootingRangeDialogComponent } from './components/shooting-range-dialog/shooting-range-dialog.component';
import { SelectOneRangeDialogComponent } from './components/competition/select-one-range-dialog/select-one-range-dialog.component';
import { TargetCreateComponent } from './components/target/target-create/target-create.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { TargetListComponent } from './components/target/target-list/target-list.component';
import { TargetEditComponent } from './components/target/target-edit/target-edit.component';
import { CrewStandComponent } from './components/crew/crew-stand/crew-stand.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import { PermissionComponent } from './components/profile/permission/permission.component';


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
    TPsideBarComponent,
    YesOrNoComponent,
    ShootingRangeListComponent,
    ShootingRangeFormComponent,
    ShootingRangeEditComponent,
    ShootingRangeViewComponent,
    SortPipe,
    ShootingRangeDialogComponent,
    SelectOneRangeDialogComponent,
    TargetCreateComponent,
    TargetListComponent,
    TargetEditComponent,
    CrewStandComponent,
    InputDialogComponent,
    PermissionComponent,
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
    MatDividerModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    AngularFileUploaderModule,
    ReactiveFormsModule,
    
    ToastrModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: pl_PL }, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
