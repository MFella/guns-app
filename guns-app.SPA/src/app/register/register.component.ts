import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { IziAlertService } from '../_services/iziAlert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  apprFormat: Array<boolean> = [true, true, true, true, true];

  constructor(private fb: FormBuilder, public authServ: AuthService,
    private router: Router, private izi: IziAlertService) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.registerForm.get('name'));
  }


  initForm()
  {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      surname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      emailRepeat: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      date: ['', Validators.required],
      password: ['', [Validators.required, 
        Validators.pattern(/^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]],
      passRepeat: ['', [Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]],
    }, {validators:  [this.emailMatch, this.passMatch, this.dateValid]})
  }

  passMatch(fg: FormGroup)
  {
    return fg.get('password').value === fg.get('passRepeat').value ? null : 
    {
      'mismatchPassword': true
    };
  }

  emailMatch(fg: FormGroup)
  {
    return fg.get('email').value === fg.get('emailRepeat').value ? null : 
    {
      'mismatchEmail': true
    }
  }

  dateValid(fg: FormGroup)
  {
    return fg.get('date').value > new Date(new Date().setFullYear(new Date().getFullYear() - 18).toString())? false: true
  }

  register()
  {
    console.log(this.registerForm.get('name'));

    if(this.registerForm.valid)
    {
      const newUser: User = Object.assign({}, this.registerForm.value);

      this.authServ.registerUser(newUser)
      .subscribe((res: {success: boolean, msg: string}) => {

        (res.success)? this.izi.success(res.msg) : this.izi.error(res.msg);

        if(res.success)
        {
          this.authServ.login({email: newUser.email, password: newUser.password})
            .subscribe(res => 
              {
                this.izi.info('Auto logged In');
              }, err => 
              {
                this.izi.error('Cannot login you right now');
              });
        }

      }, err => 
      {
        this.izi.error(err);
      }, () => {
        this.router.navigate(['/']);
      })
    }
  }

  updateFormat()
  {

    this.apprFormat[0] = (this.registerForm.get('password').errors?.pattern == null &&
    this.registerForm.get('passRepeat').errors?.pattern == null);

    this.apprFormat[1] = (this.registerForm.get('email').errors?.pattern == null &&
    this.registerForm.get('emailRepeat').errors?.pattern == null);

    this.apprFormat[2] = (this.registerForm.get('name').errors == null || this.registerForm.get('name').value.length == 0);
    this.apprFormat[3] = (this.registerForm.get('surname').errors == null || this.registerForm.get('surname').value.length == 0);

    this.apprFormat[4] = this.registerForm.get('date').value <= new Date().setFullYear(new Date().getFullYear() - 18).toString();
  }

  showMe()
  {
    console.log(this.registerForm.get("name"));
    console.log(this.registerForm.get("surname"));
  }
}
