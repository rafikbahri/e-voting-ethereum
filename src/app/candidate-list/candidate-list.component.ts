import { Component, OnInit } from '@angular/core';
import { ElectionService } from "app/services/election/election.service";
import { Election } from "app/models/election";
import { ModalService } from "app/services/modal-service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  elections: [Election];
  candidates: any;
  constructor(private electionService: ElectionService,private modalService: ModalService) { }

  ngOnInit() {
    this.electionService.findAll().then(res => {
      this.elections = res
      this.candidates = this.elections[0].candidates;
    }).catch(e=>{
      this.modalService.showErrorModal(e._body);
    });
  }

  changeElection(index) {
    this.candidates = this.elections[index].candidates;
  }

}
