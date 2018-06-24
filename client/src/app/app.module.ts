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
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'playlists', component: PlayListFormComponent},
  { path: 'playlists/:id', component: PlaylistComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    PlayListFormComponent,
    TrackFormComponent,
    HomeComponent,
    PlaylistComponent,
    LoginComponent,
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
