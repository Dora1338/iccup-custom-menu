export interface Tournament {
  title: string;
  id: string;
}

export interface TourResult {
  id: string;
  tourType: string;
  tourStart: string;
  title: string;
  registeredPlayersCount: string;
  confirmedPlayersCount: number;
  numOfRounds: number;
  top1: string[];
  top2: string[];
  firstChoice: string[];
  secondChoice: string[];
}
