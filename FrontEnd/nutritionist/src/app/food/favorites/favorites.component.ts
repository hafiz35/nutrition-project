import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  foodList:Food[];

  constructor(private foodService:FoodService,private authenticationService:AuthService) { }

  ngOnInit() {
    this.foodService.getFavoritesBasedOnUsername(this.authenticationService.loggedInUser.value.username).subscribe((foods:Food[])=>{
      console.log(foods);
      this.foodList=foods;
    })
  }

}
