export class Election {
   public title:string;
   public startAt:string;
   public endAt:string;
   public nbOfVoters:Number;
   public nbOfCandidates:Number;
   public smart_contract:String;
   public ring:Array<String>;
   public state:String;
   public candidates:Array<any>;
   public voters:Array<any>;
    constructor(){
  }
}
