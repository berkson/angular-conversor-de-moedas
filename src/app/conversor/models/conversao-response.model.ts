interface Base {
  code: string;
  codein: string;
  name: string;
  high: any;
  low: any;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export class ConversaoResponse {
  constructor(public base: Base) {}
}
