import { PlayerMatch } from "./player-match";

export class Match {
    matchId: number;
    homeTeam: string;
    awayTeam: string;
    homeGoals: number;
    awayGoals: number;
    date: Date;
    venue: string;
    playerMatchStats: PlayerMatch[];
}