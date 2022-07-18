import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  userForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
      associateId:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern('^CTS+[a-zA-Z]*')]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      htmlCssJs:[0],
      angular:[0],
      react:[0],
      spring:[0],
      restfull:[0],
      hibernate:[0],
      git:[0],
      docker:[0],
      jenkins:[0],
      aws:[0],
      spoken:[0],
      communication:[0],
      aptitude:[0]
    })
  }

  onSubmit(){
console.log(this.userForm.invalid)
    console.log(this.userForm.value)
    if(this.userForm.invalid){
      return;
    }else{
      //Save the data to DB
    }
  }
  get f(){
    return this.userForm.controls;
  }
}
