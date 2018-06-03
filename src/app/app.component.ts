import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "app/services/auth.service";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
import { ModalService } from "app/services/modal-service";
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  isloggedIn;
  modalContent:any={};
  constructor(private authService: AuthService, private modalService: ModalService) {
  }


  ngOnInit() {
    this.authService.status.subscribe((value) => this.isloggedIn = value);
    this.modalService.modalEvent$.subscribe(res => {
      this.modalContent = res;
      $(this.myModal.nativeElement).modal('show');
    });
  }
}
