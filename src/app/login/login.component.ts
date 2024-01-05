declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
      google.accounts.id.initialize({
        client_id: '150515501783-raa2r24n6elhjdqrn1rt8n4ec1se1o5e.apps.googleusercontent.com',
        callback: (resp: any) => this.handleLogin(resp)
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        // width:350
      });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if(response) {
      //decode the token
      const payload = this.decodeToken(response.credential);
      //store it in section
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      //navigate home
      this.router.navigate(['browse']);
    }
  }

}
