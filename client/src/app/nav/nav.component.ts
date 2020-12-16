import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  login() {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe(respose => {
      console.log(respose);
      // this.loggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout() {
    // this.loggedIn = false;
    this.accountService.logout();
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
