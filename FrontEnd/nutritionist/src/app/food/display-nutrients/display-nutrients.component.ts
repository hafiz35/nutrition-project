import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/models/food.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-display-nutrients',
  templateUrl: './display-nutrients.component.html',
  styleUrls: ['./display-nutrients.component.css']
})
export class DisplayNutrientsComponent implements OnInit {

  nutrients:any;
  foodSelected:Food;
  addToFavorite:boolean=false;
  constructor(private foodService:FoodService,private authenticationService:AuthService) { }

  ngOnInit() {
    this.foodSelected=this.foodService.foodToView;
    this.addToFavorite=this.foodService.addToFavorite;
    this.foodService.getnutrients(this.foodSelected.ndbno).subscribe(data=>{      
      this.nutrients=data['foods']['0']['food']['nutrients'];
    })
  }

  onAddToFavoriteClicked(){
    const item:Food={
      offset:this.foodSelected.offset,
      group:this.foodSelected.group,
      name:this.foodSelected.name,
      ndbno:this.foodSelected.ndbno,
      ds:this.foodSelected.ds,
      manu:this.foodSelected.manu,
      user:[this.authenticationService.loggedInUser.value],
    }
    console.log(item);
    this.foodService.addFavorite(item,this.authenticationService.loggedInUser.value.username).subscribe();
  }

}
