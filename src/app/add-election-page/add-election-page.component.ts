import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ElectionService } from "app/services/election/election.service";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
import { Election } from "app/models/election";
import { ModalService } from "app/services/modal-service";

declare let $: any;

@Component({
  selector: 'add-election-page',
  templateUrl: './add-election-page.component.html',
  styleUrls: ['./add-election-page.component.css']
})
export class AddElectionPageComponent implements OnInit {
  myForm: FormGroup;
  loadingMessage = '';
  successMessage = '';
  errorMessage = '';
  election: Election = new Election();
  saveAttempt: boolean = false;
  constructor(private fb: FormBuilder, private electionService: ElectionService,
    private votingService: VotinigService, private modalService: ModalService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      "title": ["", Validators.compose([Validators.required])],
      "votersNumber": ["",]
    });
  }

  addElection() {
    this.saveAttempt = true;
    if (this.myForm.valid) {
      this.loadingMessage = "Please Wait ...SC being deployed ...";
      this.votingService.deployNewContract().then(sc => {
        this.loadingMessage = "";
        this.electionService.create({
          'title': this.myForm.value.title,
          'nbOfVoters': this.myForm.value.votersNumber,
          'smart_contract': sc.address
        }).then(res => {
          this.modalService.showSuccessModal("SC has been deployed to Blockchain with address="+sc.address+" and  added to DB");
        }).catch(e => {
           let errorMsg = JSON.parse(e._body).message;
          this.modalService.showErrorModal(errorMsg);
        })
      }).catch(error => {
        this.modalService.showErrorModal(error);
      });
    }
  }
}
