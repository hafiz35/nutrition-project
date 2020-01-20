import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedInUser:User;
  foods: Food[]=[];
  query:string="";
  addedToFavorite:boolean=false;
  favoriteAlreadyExist:boolean=false;
  constructor(private foodService: FoodService,private router:Router,private authenticationService:AuthService) {
    this.loggedInUser=this.authenticationService.loggedInUser.value;
  }

  ngOnInit() {
    this.foodService.getfoods(this.query).subscribe(data => {
      this.foods = data['list']['item'];
    });
    this.foodService.filter.subscribe((obj: { title: string }) => {
        this.query=obj.title;
        if(this.query){
        this.foodService.getfoods(this.query).subscribe(data => {
          this.foods = data['list']['item'];
        });
      }
    });
  }

  viewDetails(name:string){
    this.foodService.getfood(name,this.query).subscribe((food:Food)=>{
      this.foodService.foodToView=food;
      this.router.navigate(['/display-nutrients']);
      this.foodService.addToFavorite=true;
    })
  }

  onAddToFavoriteClicked(food:any){
    const item:Food={
      offset:food.offset,
      group:food.group,
      name:food.name,
      ndbno:food.ndbno,
      ds:food.ds,
      manu:food.manu,
      user:[this.loggedInUser],
    }
    this.foodService.getFavoriteExistBasedOnUsername(this.loggedInUser.username,item).subscribe(data=>{
      this.favoriteAlreadyExist=data;
      if(this.favoriteAlreadyExist){
        setTimeout(()=>{
          this.favoriteAlreadyExist=false;
        },1000);
      }
      else{
        this.addedToFavorite=true;
        setTimeout(() => {
          this.addedToFavorite = false;
        }, 1000);
      }
    });
      this.foodService.addFavorite(item,this.loggedInUser.username).subscribe();
  }
}
