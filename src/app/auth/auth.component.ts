import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, ResponseData } from './auth-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  toggleUser: boolean = true;
  load = false;
  error: string;
  constructor(private auth: AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onChange() {
    this.toggleUser = !this.toggleUser;
  }
  onSubmit(data: NgForm) {
    if (!data.valid) {
      return;
    }
    else{
      const email = data.value.email;
      const password = data.value.password;
      let authObs:Observable<ResponseData>;
      this.load = true;

    if (!this.toggleUser) {
      authObs = this.auth.signUp(email, password);
    }
    else if (this.toggleUser) {
      authObs = this.auth.signIn(email, password);
    }
    authObs.subscribe(res => {
      console.log(res);
      this.router.navigate(['/recipes']);
      this.load = false;
    }, error => {
      this.load = false;
      this.error = error;
    }
    );
  }
    data.reset();
  }

}
