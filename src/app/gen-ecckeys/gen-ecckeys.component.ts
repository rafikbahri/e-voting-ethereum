import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LRSService } from "app/services/lrs/lrs.service";
import { UserService } from "app/services/user/user.service";
import { ModalService } from "app/services/modal-service";
import { saveAs as importedSaveAs } from "file-saver";

@Component({
  selector: 'app-gen-ecckeys',
  templateUrl: './gen-ecckeys.component.html',
  styleUrls: ['./gen-ecckeys.component.css']
})
export class GenEcckeysComponent implements OnInit {
  keypair: any;
  constructor(private lRSService: LRSService, private userService: UserService,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  genkeys() {
    this.lRSService.genkeys().then(keys => {
      this.keypair = keys;
    }).catch(error => {
      console.log(error);
    })
  }

  sendPubkey() {
    if (this.keypair) {
      this.userService.sendPubkey(this.keypair.publickey).then(res => {
        let user = JSON.parse(window.localStorage.getItem("user"));
        user.publicKey = this.keypair.publickey;
        window.localStorage.setItem("user",JSON.stringify(user));
        let blob = new Blob([this.keypair.privatekey], { type: "text/plain;charset=utf-8" });
        importedSaveAs(blob, "privateKey.txt");
        this.modalService.showSuccessModal(res.message);
      }).catch(error => {
        this.modalService.showErrorModal(error);
      })
    }

  }

}
