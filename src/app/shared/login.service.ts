import { Injectable } from '@angular/core';
import { CitizenregistrationService } from '../citizen-registry/citizenregistration.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginUserId: string;
  userProfile: {};
  matrimonyProfile: {};
  articlesProfile: {};
  tradeProfile: {};
  bloodProfile: {};
  advertisementProfile: {};

  constructor(private userService: CitizenregistrationService) {}

  fetchUserData(): {} {
    this.fetchUserBasicProfile();
    this.fetchUserMatrimonyDetails();
    this.fetchUserArticles();
    this.fetchUserBloodDetails();
    this.fetchUserAdvertisements();
    this.fetchUserTradeDetails();
    return {
      userProfile: this.userProfile,
      matrimonyProfile: this.matrimonyProfile,
      articlesProfile: this.articlesProfile,
      tradeProfie: this.tradeProfile,
      bloodProfile: this.bloodProfile,
      addvertisementProfile: this.advertisementProfile,
    };
  }

  fetchUserBasicProfile() {
    this.userService.getUser(this.loginUserId);
  }

  private fetchUserMatrimonyDetails() {}

  private fetchUserBloodDetails() {}

  private fetchUserArticles() {}

  private fetchUserAdvertisements() {}

  private fetchUserTradeDetails() {}
}
