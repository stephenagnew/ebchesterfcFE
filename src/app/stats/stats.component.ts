import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { Player } from './player';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  players: Player[];
  playerGoals: Player[];
  playerAssists: Player[];
  playerMoM: Player[];
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(){
    this.playerService.getPlayers()
    .subscribe(res => {
      this.players = res;
      this.playerGoals = [...this.players].sort((a,b) => {return b.playerSeasonStats.goals - a.playerSeasonStats.goals})
      this.playerAssists = [...this.players].sort((a,b) => {return b.playerSeasonStats.assists - a.playerSeasonStats.assists})
      this.playerMoM = [...this.players].sort((a,b) => {return b.playerSeasonStats.mom - a.playerSeasonStats.mom})
    }, 
    error => {
      console.log(error)
    })
  }

}
