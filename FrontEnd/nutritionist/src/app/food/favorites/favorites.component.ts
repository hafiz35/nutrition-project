import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  foodList:Food[];
  query:string="";

  constructor(private foodService:FoodService,private authenticationService:AuthService,private router:Router) { }

  ngOnInit() {
    this.foodService.getFavoritesBasedOnUsername(this.authenticationService.loggedInUser.value.username).subscribe((foods:Food[])=>{
      console.log(foods);
      this.foodList=foods;
    })
  }

  viewDetails(name:string){
    this.foodService.getfood(name,this.query).subscribe((food:Food)=>{
      this.foodService.foodToView=food;
      this.router.navigate(['/display-nutrients']);
      this.foodService.addToFavorite=false;
    })
  }

}
