import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../stats/player.service';
import { Player } from '../stats/player';
import { PlayerMatch } from '../matches/player-match';
import { Match } from '../matches/match';
import { MatchesService } from '../matches/matches.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.scss']
})
export class MatchReportComponent implements OnInit {

  matchId: number;
  selectedGame: Match;
  players: Player[];
  selectedPlayers: Player[] = new Array<Player>();

  constructor(private playerService: PlayerService, private matchService: MatchesService, private route: ActivatedRoute) { 

    this.getPlayers();

    this.route.params
      .subscribe(params => {
        this.matchId = params['id']
        this.getMatch(this.matchId);
      });
      
  }

  ngOnInit() {
      
  }

  getMatch(id: number){
    this.matchService.getMatchById(id)
      .subscribe(res => {
        this.selectedGame = res;
      },
      error => {
        console.log(error)
      });
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

  selectPlayer(player: Player){
    //let playerMatchStats: PlayerMatch = new PlayerMatch();
    //playerMatchStats.playerId = player.playerId;
    //this.selectedGame.playerMatchStats.push(playerMatchStats);
    if(this.selectedPlayers.find(p => p.playerId == player.playerId) === undefined){
      this.selectedPlayers.push(player);
      this.players = this.players.filter(p => {
        return p.playerId != player.playerId;
      });
    }
  }

  removePlayer(player: Player){
    this.selectedPlayers = this.selectedPlayers.filter(p => {
      return p.playerId != player.playerId; 
    });
    this.players.push(player);
    
  }

  onSelectGoals(player: Player, value: number){
    player.playerSeasonStats.goals = value;
  }

  onSelectAssists(player: Player, value: number){
    player.playerSeasonStats.assists = value;
  }

  onSelectMom(player: Player, value: number){
    player.playerSeasonStats.mom = value;
  }

  UpdateMatchDetails(){
    //Put to Api to update match with the match report
  }

}
