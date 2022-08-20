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
      associateId: ['', Validators.pattern('^CTS+[a-zA-Z]*')],
      skillName: ['']
    })
  }

  onSubmit() {

    //this.userProfiles=[];
    this.trackerApi.getUserProfiles(this.searchForm.value).subscribe({
      next: (v) => {
        this.userProfiles = v;
        console.log("response")
        console.log(this.userProfiles)
        if (this.userProfiles.length == 0) {
          this.result = true;
        }
      },
      error: (err) => console.log(err)
    })
  }
  get f() {
    return this.searchForm.controls;
  }
}
