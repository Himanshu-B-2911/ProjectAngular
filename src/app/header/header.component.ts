import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() drawer:any;
  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit() {
  }
  onLogout(){
   this.authservice.logout()
   .subscribe((res:any) =>{
    this.router.navigate(['/']);
   },
   err => {
    console.log(err);
  })
  }
}
