import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StatsComponent } from './stats/stats.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatchReportComponent } from './match-report/match-report.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchesService } from './matches/matches.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavBarComponent,
    StatsComponent,
    MatchReportComponent,
    MatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule,
    HttpClientModule
    
  ],
  providers: [
    AuthService,
    MatchesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
