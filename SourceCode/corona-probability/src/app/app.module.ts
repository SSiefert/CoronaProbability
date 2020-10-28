import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './start/start.component';

import { LOCALE_ID} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: StartComponent }
    ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatInputModule,
    MatButtonModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
