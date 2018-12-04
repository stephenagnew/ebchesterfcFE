import { Component, OnInit } from '@angular/core';
import { MatchesService } from './matches.service';
import { Match } from './match';
import { Router } from '@angular/router';
import { MatchReportComponent } from '../match-report/match-report.component';

@Component({
  selector: 'matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  private fixtures: Match[]
  private results: Match[]
  private lastMatch: Match;
  private nextMatch: Match;
  private showFixtures: boolean = false;
  private showResults: boolean = true;

  constructor(private matchesService:MatchesService, private router: Router) {

   }

  ngOnInit() {
    this.getResults();
    this.getFixtures();
  }

  getResults(){
    this.matchesService.getResults()
      .subscribe(res => {
        this.results = res;
        this.lastMatch = this.results[0];
      }, 
      error => {
        console.log(error)
      })
  }

  getFixtures(){
    this.matchesService.getFixtures()
      .subscribe(res => {
        this.fixtures = res;
        this.nextMatch = this.fixtures[0];
      },
      error => {
        console.log(error)
      })
  }

  fixtureToggle(){
    this.showFixtures = true;
    this.showResults = false;
  }

  resultsToggle(){
    this.showFixtures = false;
    this.showResults = true;
  }

  resultClass(result: Match):string{
    if(result.homeGoals > result.awayGoals && result.homeTeam === 'Ebchester'){
      return 'result-row win'
    }
    if(result.awayGoals > result.homeGoals && result.awayTeam === 'Ebchester'){
      return 'result-row win'
    }
    if(result.homeGoals == result.awayGoals){
      return 'result-row draw'
    }

    return 'result-row lose'
  }

  navigateToMatchReport(matchId: number){
    this.router.navigate(['/matchreport', matchId]);
  }


}
