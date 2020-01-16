import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tempfoods: Food[];
  foods: Food[];
  constructor(private foodService: FoodService,private router:Router) {
  }

  ngOnInit() {
    this.foodService.getfoods().subscribe(data => {
      this.foods = data['list']['item'];
      this.tempfoods=data['list']['item'];
    });
    this.foodService.filter.subscribe((obj: { title: string }) => {
      if (obj.title !== '') {
        const result = this.tempfoods.filter(filterfood => filterfood.name.toLowerCase().includes(obj.title.toLowerCase()));
        this.foods = result ? result : [];
      } else {
        this.foods = [...this.tempfoods];
      }
    });
  }

  viewDetails(name:string){
    this.foodService.getfood(name).subscribe((food:Food)=>{
      this.foodService.foodToView=food;
    })
  }

}
