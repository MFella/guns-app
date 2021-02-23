import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { IziAlertService } from '../_services/iziAlert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, public authServ: AuthService,
    public izi: IziAlertService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.loginForm);
  }

  initForm()
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]]
    })
  }

  onSubmit()
  {

    let loginCreds = Object.assign({}, this.loginForm.value);

    this.authServ.login(loginCreds)
      .subscribe((user) => {
        this.izi.success(`You were loggedIn successfully!`);

      }, (err) => 
      {
        this.izi.error(`Some error occured: ${err.error.msg}`);
        console.log(err);
      }, () => {
        //automatically log in!
       this.router.navigate(['/']);
      })

    console.log(this.loginForm);
  }

}
