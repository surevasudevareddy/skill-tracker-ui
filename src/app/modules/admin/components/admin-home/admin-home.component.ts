import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/shared/model/user-profile';
import { TrackerGatewayApiService } from 'src/app/shared/services/tracker-gateway-api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  result = false;
  searchForm!: FormGroup
  userProfiles: UserProfile[] = []
  constructor(private formBuilder: FormBuilder,
    private trackerApi: TrackerGatewayApiService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
      associateId: ['', Validators.pattern('^CTS+[0-9]*')],
      skillName: ['']
    })
  }

  onSubmit() {
    this.trackerApi.getUserProfiles(this.searchForm.value).subscribe({
      next: (response) => {
        this.userProfiles = response['profileList'];
        //Object.assign(this.userProfiles, response['profileList'])
        console.log(this.userProfiles)
        if (this.userProfiles.length === 0) {
          this.result = true;
        } else {
          this.result = false;
        }
      },
      error: (err) => console.log(err)
    })
  }
  get f() {
    return this.searchForm.controls;
  }
}
