import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessagePopup } from './employee-details.component';
const routes = [
  {
      path     : 'employees/employee-details',
      component: MessagePopup
  }
];

@NgModule({
  declarations: [
    MessagePopup
  ],
  imports     : [
      
      RouterModule.forChild(routes)
  ],

})
export class MessagePopupModule { }
