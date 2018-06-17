import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/calllback.component';
import { PlayListFormComponent } from './form/playlistForm.component';
import { FormsModule } from '@angular/forms';
import { TrackFormComponent } from './form/trackForm.component';


const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'playlists', component: PlayListFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    PlayListFormComponent,
    TrackFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
