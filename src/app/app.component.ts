import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpaceX';
  baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100";
  spacexData = [];
  checkData: boolean;

  constructor(
    private authService: AuthService,
  ) {

  }
  ngOnInit() {
    var data = {
      url: this.baseUrl
    }
    this.fetchData(data);

  }
  fetchData(data) {
    this.spacexData = [];
    this.authService.spacexData(data).subscribe(
      (res) => {
        console.log(res)
        
        if (res.length != 0) {
          this.checkData=true;
          for (var i = 0; i < res.length; i++) {
            if (res[i].mission_id.length == 0) {
              res[i].mission_id[0] = " "
            }
            var dataValue = {
              mission_name: res[i].mission_name + " " + "#" + res[i].flight_number,
              mission_patch_small: res[i].links.mission_patch_small,
              mission_ids: res[i].mission_id,
              launch_year: res[i].launch_year,
              launch_success: res[i].launch_success,
              land_success: res[i].rocket.first_stage.cores[0].land_success
            }
            this.spacexData.push(dataValue)
          }
        }else{
          this.checkData=false
        }


      }
    );
  }
  onClickLaunchYear(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var data = {
      url: this.baseUrl + "&launch_success=true&land_success=true&launch_year=" + value
    }
    this.fetchData(data);
  }
  onClickSuccessfulLaunch(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    var data = {
      url: this.baseUrl + "&launch_success=" + value
    }
    this.fetchData(data);
  }
  onClickSuccessfulLanding(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    var data = {
      url: this.baseUrl + "&launch_success=true&land_success=" + value
    }
    this.fetchData(data);
  }
}
