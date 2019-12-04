import { Component, OnInit, Input, HostListener, ElementRef, Inject } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Url } from '../../Url';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'cdk-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;
	name: string;
	//currentUser = null;
	Aaqil;


	@Input() currentUser = null;
	@HostListener('document:click', ['$event', '$event.target'])
	onClick(event: MouseEvent, targetElement: HTMLElement) {
		if (!targetElement) {
			return;
		}

		const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.isOpen = false;
		}
	}


	constructor(private elementRef: ElementRef, public dialog: MatDialog, public userService: UserService, private route: Router) { }


	ngOnInit() {
		this.currentUser.currentUserName = this.userService.getUserName();
		this.currentUser.photoURL = this.userService.getUserImg();
	}

	downloadQRCode() {
		window.open(Url.API_URL + 'api/qrcode/qrCode/download/' + this.userService.getEmployeeID(), '_blank');
	}
	logout() {
		this.route.navigateByUrl('/login');
	}
	changePassword() {
		this.changePasswordDialog();
	}

	changePasswordDialog(): void {
		let dialogRef = this.dialog.open(ChangePassword, {
			width: '450px',

		});
	}
}

@Component({
	selector: 'change-password',
	templateUrl: './changePassword.html',
	styleUrls: ['./user-menu.component.scss']
})
export class ChangePassword {
	id: number;
	userForm: FormGroup;
	changePasswordRequest: any;
	sendData = {
		email: '',
		password: '',
		newPassword: '',
		id: 0,
	}
	loginEmail: string;
	loginPassword: string;

	constructor(private http: HttpClient,
		public message: MatDialogRef<ChangePassword>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, public snackBar: MatSnackBar) { }
	ngOnInit() {
		this.id = this.userService.userId;
		this.loginEmail = this.userService.getuserEmail();
		this.loginPassword = this.userService.getuserPassword();
		this.userForm = new FormGroup({
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			newPassword: new FormControl('', [Validators.required]),
			confirmPassword: new FormControl('', [Validators.required]),
		});
	}
	closeMessage(): void {
		this.message.close();
	}
	onSubmit(form: NgForm) {
		this.changePasswordRequest = form.value;
		if (this.changePasswordRequest.newPassword == this.changePasswordRequest.confirmPassword) {
			return new Promise((resolve, reject) => {
				this.http.post(Url.API_URL + 'api/user/changePassword', this.changePasswordRequest)
					.subscribe((response: any) => {
						resolve(response);
					}, reject);
				this.snackBar.open('Password changed Successful', 'OK', {
					duration: 2000,
					verticalPosition: 'top',
				});
				this.message.close();
			});
		}
		else {
			this.snackBar.open('Passwords do not match', 'OK', {
				duration: 2000,
				verticalPosition: 'top',
			});

		}
	}


}
