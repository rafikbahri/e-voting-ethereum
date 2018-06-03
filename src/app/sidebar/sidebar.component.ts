import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role = JSON.parse(localStorage.getItem("user")).role;
  constructor(private authService:AuthService) { 
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

}
