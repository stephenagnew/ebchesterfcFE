import { Component, OnInit } from '@angular/core';
import { MatchesService } from './matches.service';
import { Match } from './match';

@Component({
  selector: 'matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  private fixtures: Match[]
  private results: Match[]

  constructor(private matchesService:MatchesService) {

   }

  ngOnInit() {
    this.getResults()
  }

  getResults(){
    this.matchesService.getResults()
      .subscribe(res => {
        this.results = res;
      }, 
      error => {
        console.log(error)
      })
  }

  getFixtures(){
    this.matchesService.getFixtures()
      .subscribe(res => {
        this.fixtures = res;
      },
      error => {
        console.log(error)
      })
  }


}
