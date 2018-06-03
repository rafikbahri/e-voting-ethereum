import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from "environments/environment";
import { ModalService } from "app/services/modal-service";

//Blockchain libraries
//import * as Web3 from 'web3';
const Web3 = require('web3');
declare var window: any;

@Injectable()
export class Web3Service {
  public _web3: any;
  public account: any;

  constructor(private modalService: ModalService) {

    this.checkAndInstantiateWeb3();
    try {
      this.account = this._web3.eth.accounts[0];
    }
    catch (err) {
      this.modalService.showErrorModal(err);
    }

  }

  stringToBytes32(message)
  { return this._web3.toAscii(message); }


  checkAndInstantiateWeb3() {
    if (typeof window.web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);
      console.log("current network =", this._web3.version.network);
      this._web3.eth.defaultAccount = window.web3.eth.defaultAccount;
      console.log("current account =", this._web3.eth.defaultAccount);
    }
    else {
      console.warn('No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      try {
        this._web3 = new Web3(
          new Web3.providers.HttpProvider(environment.HttpProvider)
        );
        console.log("current network =", this._web3.version.network);
      }
      catch (err) {
         this.modalService.showErrorModal(err);
      }
    }
  }

  getAccounts(): Observable<any> {
    return Observable.create(observer => {
      this._web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          observer.error('There was an error fetching your accounts.')
        }

        if (accs.length === 0) {
          observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        }

        observer.next(accs)
        observer.complete()
      });
    })
  }

  unlockAccount() {
    return new Promise<any>((resolve, reject) => {
      this._web3.personal.unlockAccount(this.account, "", (e, res) => {
        if (e) {
          console.log("error login ", e);
          reject(e);
        }
        console.log("login", res);
        resolve(res)
      });
    });
  }

  dateToUnixTime(date?) {
    if (date) {
      return Math.round((new Date(date)).getTime() / 1000);
    }
    else {
      return Math.round((new Date()).getTime() / 1000);
    }
  }


  unixTimeToDate(unixTime) {
    let time = new Date(unixTime * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = time.getFullYear();
    let month = months[time.getMonth()];
    let date = Number(time.getDate());
    let hour = Number(time.getHours());
    let min = Number(time.getMinutes());
    let sec = Number(time.getSeconds());
    let res = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return res;
  }

  async waitForTxMine(txHash) {
    console.log("waitForTxMine");
    var tx;
    this._web3.eth.getTransaction(txHash, (e, r) => tx = r);
    while (tx == null || tx.blockNumber == null) {
      await this.sleep(2000);
      this._web3.eth.getTransaction(txHash, (e, r) => tx = r);
    }
    console.log(tx);
    return tx;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  toUtf8(res) {
    return this._web3.toUtf8(res);
  }
}

