import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { DataStorageService } from '../shared/dataStorage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuthentcated: boolean;


  constructor(private storge: DataStorageService, private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.storge.fetchRecipe().subscribe();
    this.authService.userSubject.subscribe(user => {
      this.isAuthentcated = !!user;
    })
  }


  onSave() {
    this.storge.saveRecipe();
  }

  onFetch() {
    this.storge.fetchRecipe().subscribe();
  }
  Onlogout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }


}
