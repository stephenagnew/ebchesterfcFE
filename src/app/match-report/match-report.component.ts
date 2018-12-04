import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../stats/player.service';
import { Player } from '../stats/player';
import { PlayerMatch } from '../matches/player-match';
import { Match } from '../matches/match';
import { MatchesService } from '../matches/matches.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

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
  editMode: boolean = false;
  loaded: boolean = false;
  saved: boolean = false;

  constructor(private playerService: PlayerService,
     private matchService: MatchesService,
      private route: ActivatedRoute, 
      private authService: AuthService) { 

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
        delete this.selectedGame["_id"];
        this.getPlayers();
      },
      error => {
        console.log(error)
      });
  }

  getPlayers(){
    this.playerService.getPlayers()
    .subscribe(res => {
      this.players = res;
      this.players.forEach((player) => {
        player.playerSeasonStats = {playerId: player.playerId, appearance: 0, goals: 0, assists: 0, mom: 0}
      });

      this.syncPlayerData();

      this.loaded = true;
    }, 
    error => {
      console.log(error)
    })

  }

  selectPlayer(player: Player){
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

    if(this.selectedGame.playerMatchStats.find(p => p.playerId == player.playerId)){
      this.selectedGame.playerMatchStats = this.selectedGame.playerMatchStats.filter(p => {
        return p.playerId != player.playerId;
      })
    }
    this.players.push(player);
    
  }

  onSelectGoals(player: Player, value: number){
    player.playerSeasonStats.goals = Number(value);
  }

  onSelectAssists(player: Player, value: number){
    player.playerSeasonStats.assists = Number(value);
  }

  onSelectMom(player: Player, value: number){
    player.playerSeasonStats.mom = Number(value);
  }

  UpdateMatchDetails(){
    this.saved = false;
    this.selectedPlayers.forEach((player) => {
      if(this.selectedGame.playerMatchStats.find(p => p.playerId == player.playerId) === undefined){
        this.selectedGame.playerMatchStats.push(player.playerSeasonStats) //In this instance the player season stats have been replaced with game stats.
      }
    });

    let gameToUpdate: Match = this.selectedGame;

    this.matchService.updateMatchDetails(gameToUpdate)
      .subscribe(res => {
        this.saved = true;
        //console.log("SAVED")
      },
      error => {
        console.log(error)
      });
  }

  edit(){
    this.editMode = !this.editMode;
  }

  getFirstName(playerId: number) : string{
    let player: Player = this.players.find(x => x.playerId == playerId);

    return `${player.firstName} `
  }

  getLastName(playerId : number) : string{
    let player: Player = this.players.find(x => x.playerId == playerId);

    return ` ${player.lastName}`
  }

  syncPlayerData(){
    if(this.selectedGame.playerMatchStats.length > 0){
      this.selectedGame.playerMatchStats.forEach((playerMatch) => {
        let player: Player = {
            playerId:playerMatch.playerId,
            firstName: this.getFirstName(playerMatch.playerId),
            lastName: this.getLastName(playerMatch.playerId),
            playerSeasonStats: {
              playerId: playerMatch.playerId,
              appearance: playerMatch.appearance,
              goals: playerMatch.goals,
              assists: playerMatch.assists,
              mom: playerMatch.mom
            },
            previousSeasons : []
          }
        if(this.selectedPlayers.find(p => p.playerId == player.playerId) === undefined){
          this.selectedPlayers.push(player)
          this.players = this.players.filter(p => {
            return p.playerId != player.playerId;
          });
        }
      })
    }
  }


}
