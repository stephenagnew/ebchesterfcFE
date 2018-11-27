import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchReportComponent } from './match-report/match-report.component';
import { StatsComponent } from './stats/stats.component';
import { MatchesComponent } from './matches/matches.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'matches', 
    component: MatchesComponent
    },
  {
    path: 'stats', 
    component: StatsComponent
    },
  {
    path: 'matchreport/:id', 
    component: MatchReportComponent
    //add a route guard here 
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
