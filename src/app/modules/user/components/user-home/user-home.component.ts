import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Skill, UserProfile } from 'src/app/shared/model/user-profile';
import { AuthStorageService } from 'src/app/shared/services/auth-storage.service';
import { TackerGatewayApiService } from 'src/app/shared/services/tacker-gateway-api.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  userForm!:FormGroup;
  disableUser= ''
  disableSkill= ''
  userProfile!:UserProfile;
  success=false;
  constructor(private formBuilder:FormBuilder,private trackerAPI:TackerGatewayApiService,private router:ActivatedRoute,private authStorage:AuthStorageService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
      associateId:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern('^CTS+[a-zA-Z0-9]*')]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      htmlCssJs:[0],
      htmlCssJsId:[0],
      angular:[0],
      angularId:[0],
      react:[0],
      reactId:[0],
      spring:[0],
      springId:[0],
      restfull:[0],
      restfullId:[0],
      hibernate:[0],
      hibernateId:[0],
      git:[0],
      gitId:[0],
      docker:[0],
      dockerId:[0],
      jenkins:[0],
      jenkinsId:[0],
      aws:[0],
      awsId:[0],
      spoken:[0],
      spokenId:[0],
      communication:[0],
      communicationId:[0],
      aptitude:[0],
      aptitudeId:[0],
      id:[0]
    })
    const routerParm = this.router.paramMap.subscribe({
      next:(parm) => {
    console.log(parm.get('userId'))
    //load profile detwials by using the name, and show them in the UI, if not available then just show empty form fillable.
    //if data is available then disable full form except skill section if last edit date is grater or equals to 10 days
    this.trackerAPI.getUserProfile(parm.get('userId')).subscribe({
      next: (response) => {
        console.log(response)
        this.disableUser= 'disabled';
        this.disableSkill= 'disabled';
        this.userProfile = new UserProfile(); 
        if(response){
        Object.assign(this.userProfile, response);
        console.log('days difference:' + this.getDifferenceInDays(new Date(),new Date(this.userProfile.updateTs)))
        if(this.getDifferenceInDays(new Date(),new Date(this.userProfile.updateTs)) >=10){
          this.disableSkill = '';
        }
        this.consumeResponse(response);
      }else{
        let user = this.authStorage.getUser()
        this.f['name'].setValue(user.userName);
        this.f['associateId'].setValue('CTS'+user.userInfoId);
        this.f['email'].setValue(user.emailId);
      }
      },
      error: (e) =>{ 
        console.log(e)     
        //no valid records found so prepopulate user detials in the form
        let user = this.authStorage.getUser()
        console.log(user)
        this.f['name'].setValue(user.username);
        this.f['associateId'].setValue('CTS'+user.id);
        this.f['email'].setValue(user.email);
      },
      complete: () => console.log('#####completed init')
      
    })
  }
  });
  }

  onSubmit(){
    console.log(this.userForm.invalid)
    console.log(this.userForm.value)
    // if(this.userForm.invalid){
    //   return;
    // }else{
      //Save the data to DB
      let userProfile = new UserProfile();
      userProfile.name = this.f['name'].value
      userProfile.associateId = this.f['associateId'].value
      userProfile.email = this.f['email'].value
      userProfile.mobile = this.f['mobile'].value
      userProfile.createTs = new Date();
      userProfile.updateTs = new Date();
      userProfile.skill.push(new Skill('htmlCssJs',this.f['htmlCssJs'].value,'Y'));
      userProfile.skill.push(new Skill('angular',this.f['angular'].value,'Y'));
      userProfile.skill.push(new Skill('react',this.f['react'].value,'Y'));
      userProfile.skill.push(new Skill('spring',this.f['spring'].value,'Y'));
      userProfile.skill.push(new Skill('restfull',this.f['restfull'].value,'Y'));
      userProfile.skill.push(new Skill('hibernate',this.f['hibernate'].value,'Y'));
      userProfile.skill.push(new Skill('git',this.f['git'].value,'Y'));
      userProfile.skill.push(new Skill('docker',this.f['docker'].value,'Y'));
      userProfile.skill.push(new Skill('jenkins',this.f['jenkins'].value,'Y'));
      userProfile.skill.push(new Skill('aws',this.f['aws'].value,'Y'));
      userProfile.skill.push(new Skill('spoken',this.f['spoken'].value,'N'));
      userProfile.skill.push(new Skill('communication',this.f['communication'].value,'N'));
      userProfile.skill.push(new Skill('aptitude',this.f['aptitude'].value,'N'));
      this.trackerAPI.addUserProfile(userProfile).subscribe({
        next: (v) =>{ console.log(v);
          //once the form got saved then disable complete form
          this.disableUser= 'disabled';
          this.disableSkill = 'disabled';
         this.consumeResponse(v);
         this.success = true;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });
      
    //}
  }
  get f(){
    return this.userForm.controls;
  }

//update the skills which are got modified
onUpdate(){

  this.userProfile.updateTs = new Date();//update data for user and take the modified skills into array to send to service
  this.userProfile.skill = this.userProfile.skill.filter(skill => {  
    if(this.f[skill.skillName].dirty){
      skill.expertiseLevel= Number(this.f[skill.skillName].value);
      return skill;  
    }  
    return undefined;
  })
  this.trackerAPI.updateUserProfile(this.userProfile).subscribe({
    next: (v)=> console.log('updated successfully.'),
    error: (e)=> console.log(e)
  });
  this.disableSkill = 'disabled';//disabled the skill section, so that it will now allow for immidiate update
}

consumeResponse(v:any){
  let userProf : UserProfile = new UserProfile(); 
  //const res : any = JSON.parse(v);

  Object.assign(userProf, v);
  this.f['id'].setValue(userProf.id);
  this.f['name'].setValue(userProf.name);
  this.f['associateId'].setValue(userProf.associateId);
  this.f['email'].setValue(userProf.email);
  this.f['mobile'].setValue(userProf.mobile);
  userProf.skill.forEach(element => {
    if(element.skillName == "htmlCssJs"){
      this.f['htmlCssJsId'].setValue(element.id);
      this.f['htmlCssJs'].setValue(element.expertiseLevel);
    }else if(element.skillName == "angular"){
      this.f['angularId'].setValue(element.id);
      this.f['angular'].setValue(element.expertiseLevel);
    }else if(element.skillName == "react"){
      this.f['reactId'].setValue(element.id);
      this.f['react'].setValue(element.expertiseLevel);
    }else if(element.skillName == "spring"){
      this.f['springId'].setValue(element.id);
      this.f['spring'].setValue(element.expertiseLevel);
    }else if(element.skillName == "restfull"){
      this.f['restfullId'].setValue(element.id);
      this.f['restfull'].setValue(element.expertiseLevel);
    }else if(element.skillName == "hibernate"){
      this.f['hibernateId'].setValue(element.id);
      this.f['hibernate'].setValue(element.expertiseLevel);
    }else if(element.skillName == "git"){
      this.f['gitId'].setValue(element.id);
      this.f['git'].setValue(element.expertiseLevel);
    }else if(element.skillName == "docker"){
      this.f['dockerId'].setValue(element.id);
      this.f['docker'].setValue(element.expertiseLevel);
    }else if(element.skillName == "jenkins"){
      this.f['jenkinsId'].setValue(element.id);
      this.f['jenkins'].setValue(element.expertiseLevel);
    }else if(element.skillName == "aws"){
      this.f['awsId'].setValue(element.id);
      this.f['aws'].setValue(element.expertiseLevel);
    }else if(element.skillName == "spoken"){
      this.f['spokenId'].setValue(element.id);
      this.f['spoken'].setValue(element.expertiseLevel);
    }else if(element.skillName == "communication"){
      this.f['communicationId'].setValue(element.id);
      this.f['communication'].setValue(element.expertiseLevel);
    }else if(element.skillName == "aptitude"){
      this.f['aptitudeId'].setValue(element.id);
      this.f['aptitude'].setValue(element.expertiseLevel);
    }
  });
  console.log(this.userForm.value);
}
getDifferenceInDays(date1 : Date, date2: Date) {  
  const diffInMs = Math.abs(+date2 - +date1); //appending + will convert date into millis
  return diffInMs / (1000 * 60 * 60 * 24);
}
}
