import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as auth from 'hellojs';


// Specific B2C tenant information and policies.
const tenantName: string = 'ebchester.onmicrosoft.com';
const signInSignUpPolicyName: string = 'B2C_1_SiUpIn';
const redirectUri: string = 'http://localhost:4200/dashboard';
const redirectLogoutUri: string = 'http://localhost:4200/';
//const redirectUri: string = 'https://blackhillandebchester.azurewebsites.net/';
//const redirectLogoutUri: string = 'https://blackhillandebchester.azurewebsites.net/';
const defaultScopes: string = 'openid https://ebchester.onmicrosoft.com/api/read';

@Injectable()
export class AuthService {

  ebchesterSiUpInPolicy : string = 'ebchesterSignInSignUp';
  constructor() { }

  initAuth() {
    auth.init({
      ebchesterSignInSignUp: {
        id: '918cbb2b-8778-483b-aa35-3f963a3f959a',
        oauth: {
          version:2,
          auth: `https://ebchester.b2clogin.com/${tenantName}/oauth2/v2.0/authorize?p=${signInSignUpPolicyName}`
        },
        scope_delim: ' ',
        //form: false
      }
    },
    {
      redirectUri: redirectUri,
      response_type: 'id_token token'
    })
  }

  login() {
    auth(this.ebchesterSiUpInPolicy).login({scope:defaultScopes, display: 'page', page_uri:redirectUri, redirect_uri:redirectUri}).then(
      null,
      (e: any) => console.error(e.error.message)
    );
  }

  logout(){
    auth(this.ebchesterSiUpInPolicy).logout({force:true}).then(
      () => {
        window.location.href = "https://ebchester.b2clogin.com/" + tenantName + "/oauth2/v2.0/logout?p=" + signInSignUpPolicyName + 
                "&post_logout_redirect_uri=" + redirectLogoutUri
      },
      (e:any) => console.error(e.error.message)
    );
  }

  public isAuthenticated(): boolean {
    let session = auth(this.ebchesterSiUpInPolicy).getAuthResponse();
    const currentTime = (new Date()).getTime() / 1000;

    // If a valid session exists and the access token has expired request a new access token

    //if (session && session.access_token && session.expires < currentTime) {
        
        // Request a new access token silently
        //this.acquireTokenSilent();
        //return true;
    //}

    // If the access token hasn't expired user is authenicated
    if (session && session.access_token && session.expires > currentTime) {          
        return true;
    } else {
        return false;
    };
}

  getIdToken() {
    let session = auth(this.ebchesterSiUpInPolicy).getAuthResponse();
    let idToken = session.id_token;
    let parsedToken = this.parseJwt(idToken)
    return parsedToken;
  }

  getAccessToken() {
    let session = auth(this.ebchesterSiUpInPolicy).getAuthResponse();
    let access_token = session.access_token;
    return access_token;
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  getUserName(): string {
    let idToken = this.getIdToken();
    return `${idToken.given_name} ${idToken.family_name}`
}


}
