import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextPhase'
})
export class NextPhasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args == "voter") {
      console.log(value)
      switch (value) {
        case "REGISTRATION": return "Register";
        case "VOTING": return "Vote";
        case "FINISHED": return "See Results";
        default: return "Wait";
      }
    }
    else
      switch (value) {
        case "SETUP": return "Start Registration";
        case "REGISTRATION": return "Start Voting";
        case "VOTING": return "Stop Voting";
        case "READY_TO_TALLY": return "Tally";
        case "FINISHED": return "See Results";
      }
  }

}
