import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private foodService:FoodService) { }

  ngOnInit() {
  }

  onSearchText(event : any){
    console.log(event.target.value);
    this.foodService.filter.next({title:event.target.value});
  }
  
}
