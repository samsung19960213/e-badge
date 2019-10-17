import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Url } from '../Url';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
//import { ViewEncapsulation } from '@angular/compiler/src/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {
  userImg: string;
  name: string;
  Lname: string;
  userId: number;
  password: string;
  email: string;
  designation: string;
  department: string;
  employeeId: string;

  // login(login: any) {
  //   console.log(login.value);
  //   return new Promise((resolve, reject) => {
  //     this.http.post(Url.API_URL + 'api/login', login.value)
  //         .subscribe((response: any) => {
  //             resolve(response);
  //             this.router.navigateByUrl('/auth/dashboard');
  //         }, reject);
  // });
  // }

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
    public fb: FormBuilder, private http: HttpClient, public userService: UserService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['abulhasan@gmail.com', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['mindstack', [

        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }
  login(login: any) {


    return new Promise((resolve, error) => {
      this.http.post(Url.API_URL + '/api/login', login.value)
        .subscribe((response: any) => {
          resolve(response);

          this.userService.setUserinfo(response.userName, response.userImage, response.id, response.password, response.email, response.department, response.designation, response.employeeId, response.lastName, response.userRoleId,response.companyId,response.companyName,response.cmpLogoUrl);
          this.userId = response.userRoleId;
          if (this.userId == 1 || this.userId == 3) {


            this.router.navigateByUrl('auth/dashboard');
          } else {

            this.snackBar.open('You are not authorised to login', 'OK', {
              duration: 2000,
              verticalPosition: 'top',




            });
          }

        }, (error: any) => {

          this.snackBar.open('Username / Password is incorrect', 'OK', {
            duration: 2000,
            verticalPosition: 'top',

          });
        });
    });


  }

}



