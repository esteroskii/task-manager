export interface MovementIntf {
   fromListIdx : number,
   fromCardIdx : number,
   toListIdx : number,
   toCardIdx : number,
   listname: string
}


export class Movement implements MovementIntf{
    fromListIdx: number;    
    fromCardIdx: number;
    toListIdx: number;
    toCardIdx: number;
    listname: string

    constructor(fromListIdx : number , toListIdx : number , fromCardIdx? : number , toCardIdx? : number, listname? : string){
        this.fromListIdx = fromListIdx;
        this.toListIdx = toListIdx;

        this.fromCardIdx = fromCardIdx;
        this.toCardIdx = toCardIdx;
        this.listname = listname;
    }
    
}


