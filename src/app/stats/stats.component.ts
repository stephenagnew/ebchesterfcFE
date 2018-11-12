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
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(){
    this.playerService.getPlayers()
    .subscribe(res => {
      this.players = res;
    }, 
    error => {
      console.log(error)
    })
  }

}
