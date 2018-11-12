import { PlayerMatch } from "../matches/player-match";

export class Player {
    playerId: number;
    firstName: string;
    lastName: string;
    playerSeasonStats : PlayerMatch
    previousSeasons: PlayerMatch[]
}