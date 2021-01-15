import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RTL } from '@progress/kendo-angular-l10n';
import { CommonService } from './services/common.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { DescriptionComponent } from './components/description.component'
// TODO npm uninstall -S angular-in-memory-web-api
// TODO npm uninstall -D angular-in-memory-web-api

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],

   // Enable Right-to-Left mode for Kendo UI components
  providers: [
    { provide: RTL, useValue: true },
    CommonService,
    HttpClient,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
