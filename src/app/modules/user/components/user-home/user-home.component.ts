import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileSkill, UserProfile } from 'src/app/shared/model/user-profile';
import { AuthStorageService } from 'src/app/shared/services/auth-storage.service';
import { TrackerGatewayApiService } from 'src/app/shared/services/tracker-gateway-api.service';
import { APP_CONSTANTS } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  userForm!: FormGroup;
  disableUser = ''
  disableSkill = ''
  userProfile!: UserProfile;
  success = false;
  update = false;

  constructor(private formBuilder: FormBuilder,
    private trackerAPI: TrackerGatewayApiService,
    private router: ActivatedRoute,
    private authStorage: AuthStorageService) { }

  ngOnInit(): void {
    let user = this.authStorage.getUser()
    const associateId = APP_CONSTANTS.PREFIX_CTS + user.id;
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      associateId: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^CTS+[a-zA-Z0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      htmlCssJs: [0],
      htmlCssJsId: [0],
      angular: [0],
      angularId: [0],
      react: [0],
      reactId: [0],
      spring: [0],
      springId: [0],
      restfull: [0],
      restfullId: [0],
      hibernate: [0],
      hibernateId: [0],
      git: [0],
      gitId: [0],
      docker: [0],
      dockerId: [0],
      jenkins: [0],
      jenkinsId: [0],
      aws: [0],
      awsId: [0],
      spoken: [0],
      spokenId: [0],
      communication: [0],
      communicationId: [0],
      aptitude: [0],
      aptitudeId: [0],
      id: [0]
    })
    const routerParm = this.router.paramMap.subscribe({
      next: (parm) => {
        //console.log(parm.get('user'))
        //load profile details by using the name, and show them in the UI, if not available then just show empty form fillable.
        //if data is available then disable full form except skill section if last edit date is grater or equals to 10 days
        this.trackerAPI.getUserProfile(associateId).subscribe({
          next: (response) => {
            console.log(response)
            //this.disableUser = 'disabled';
            //this.disableSkill = 'disabled';
            this.userProfile = new UserProfile();
            if (this.isProfileExists(response)) {
              this.consumeResponse(response);
            } else {
              console.log("Associate Id:" + user.id)
              this.f['name'].setValue(user.username);
              this.f['associateId'].setValue(associateId);
              this.f['email'].setValue(user.email);
            }
          },
          error: (e) => {
            console.log(e)
            //no valid records found so prepopulate user detials in the form
            // let user = this.authStorage.getUser()
            // console.log(user)
            // this.f['name'].setValue(user.username);
            // this.f['associateId'].setValue(associateId);
            // this.f['email'].setValue(user.email);
          },
          complete: () => console.log('#####completed init')

        })
      }
    });
  }

  onSubmit() {
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
    //userProfile.createTs = new Date();
    //userProfile.updateTs = new Date();
    userProfile.profileSkillList.push(new ProfileSkill('htmlCssJs', this.f['htmlCssJs'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('angular', this.f['angular'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('react', this.f['react'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('spring', this.f['spring'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('restfull', this.f['restfull'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('hibernate', this.f['hibernate'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('git', this.f['git'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('docker', this.f['docker'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('jenkins', this.f['jenkins'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('aws', this.f['aws'].value, 'Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('spoken', this.f['spoken'].value, 'Non-Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('communication', this.f['communication'].value, 'Non-Technical'));
    userProfile.profileSkillList.push(new ProfileSkill('aptitude', this.f['aptitude'].value, 'Non-Technical'));
    this.trackerAPI.addUserProfile(userProfile).subscribe({
      next: (response) => {
        console.log(response);
        //once the form got saved then disable complete form
        this.disableUser = 'disabled';
        this.disableSkill = 'disabled';
        //this.consumeResponse(v);
        this.success = true;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

    //}
  }
  get f() {
    return this.userForm.controls;
  }

  //update the skills which are got modified
  onUpdate() {
    //this.userProfile.updateTs = new Date();//update data for user and take the modified skills into array to send to service
    console.log("profile creation date: " + this.userProfile);
    this.userProfile.name = this.f['name'].value
    this.userProfile.email = this.f['email'].value;
    this.userProfile.mobile = this.f['mobile'].value
    this.userProfile.profileSkillList = this.userProfile.profileSkillList.filter(ProfileSkill => {
      if (this.f[ProfileSkill.skillName].dirty) {
        ProfileSkill.expertiseLevel = Number(this.f[ProfileSkill.skillName].value);
        return ProfileSkill;
      }
      return undefined;
    })
    this.trackerAPI.updateUserProfile(this.userProfile).subscribe({
      next: (response) => {
        console.log('updated successfully.');
        this.update = true;
      },
      error: (e) => {
        console.log(e)
      }
    });
    this.disableUser = 'disabled';
    this.disableSkill = 'disabled';//disabled the skill section, so that it will now allow for immidiate update
  }

  isProfileExists(response: any): boolean {
    let userProfiles: any[] = [];
    Object.assign(userProfiles, response['profileList'])
    return userProfiles.length > 0
  }

  consumeResponse(response: any): any {
    let userProfile: UserProfile = new UserProfile();
    let userProfiles: any[] = [];
    Object.assign(userProfiles, response['profileList'])

    userProfile = userProfiles[0];
    this.f['id'].setValue(userProfile.profileId);
    this.f['name'].setValue(userProfile.name);
    this.f['associateId'].setValue(userProfile.associateId);
    this.f['email'].setValue(userProfile.email);
    this.f['mobile'].setValue(userProfile.mobile);
    userProfile.profileSkillList.forEach(element => {
      if (element.skillName == "htmlCssJs") {
        this.f['htmlCssJsId'].setValue(element.id);
        this.f['htmlCssJs'].setValue(element.expertiseLevel);
      } else if (element.skillName == "angular") {
        this.f['angularId'].setValue(element.id);
        this.f['angular'].setValue(element.expertiseLevel);
      } else if (element.skillName == "react") {
        this.f['reactId'].setValue(element.id);
        this.f['react'].setValue(element.expertiseLevel);
      } else if (element.skillName == "spring") {
        this.f['springId'].setValue(element.id);
        this.f['spring'].setValue(element.expertiseLevel);
      } else if (element.skillName == "restfull") {
        this.f['restfullId'].setValue(element.id);
        this.f['restfull'].setValue(element.expertiseLevel);
      } else if (element.skillName == "hibernate") {
        this.f['hibernateId'].setValue(element.id);
        this.f['hibernate'].setValue(element.expertiseLevel);
      } else if (element.skillName == "git") {
        this.f['gitId'].setValue(element.id);
        this.f['git'].setValue(element.expertiseLevel);
      } else if (element.skillName == "docker") {
        this.f['dockerId'].setValue(element.id);
        this.f['docker'].setValue(element.expertiseLevel);
      } else if (element.skillName == "jenkins") {
        this.f['jenkinsId'].setValue(element.id);
        this.f['jenkins'].setValue(element.expertiseLevel);
      } else if (element.skillName == "aws") {
        this.f['awsId'].setValue(element.id);
        this.f['aws'].setValue(element.expertiseLevel);
      } else if (element.skillName == "spoken") {
        this.f['spokenId'].setValue(element.id);
        this.f['spoken'].setValue(element.expertiseLevel);
      } else if (element.skillName == "communication") {
        this.f['communicationId'].setValue(element.id);
        this.f['communication'].setValue(element.expertiseLevel);
      } else if (element.skillName == "aptitude") {
        this.f['aptitudeId'].setValue(element.id);
        this.f['aptitude'].setValue(element.expertiseLevel);
      }
    });
    console.log(this.userForm.value);
    this.userProfile = userProfile;
  }


  getDifferenceInDays(date1: Date, date2: Date): any {
    const diffInMs = Math.abs(date2.getTime() - date1.getTime()); //appending + will convert date into millis
    console.log("===" + diffInMs)
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  getDifferenceInMins(date1: Date, date2: Date): any {
    const diffInMs = Math.abs(+date2 - +date1); //appending + will convert date into millis
    return diffInMs / (1000 * 60 * 60);
  }
}
