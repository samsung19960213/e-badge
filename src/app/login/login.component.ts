import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Url } from '../Url';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
 userImg: string;
 name: string;

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
              public fb: FormBuilder,private http: HttpClient, public userService: UserService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        
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


    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/login', login.value)
          .subscribe((response: any) => {
              resolve(response);
              this.userImg= response.userImage;
              this.name= response.userName;
              this.userService.setUserinfo(response.userName, response.userImage);
              this.router.navigateByUrl('auth/dashboard');
          }, reject);
  });


  }
}



