import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StatsComponent } from './stats/stats.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatchReportComponent } from './match-report/match-report.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchesService } from './matches/matches.service';
import { PlayerService } from './stats/player.service';
import { FooterComponent } from './footer/footer.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavBarComponent,
    StatsComponent,
    MatchReportComponent,
    MatchesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [
    AuthService,
    MatchesService,
    PlayerService, 
    AuthGuardService,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
