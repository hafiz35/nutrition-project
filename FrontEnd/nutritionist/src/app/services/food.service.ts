import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  baseUrl:string="http://localhost:9080/favorite-service"
  filter = new Subject();
  foods:Food[];
  foodToView:Food;
  constructor(private httpClient:HttpClient) { }
  
  getfoods(query:string):Observable<any>{
    return this.httpClient.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${query}&offset=0&api_key=jjPhNaKUJhs5hzT25Eh0FhYlktzwUYdk9DhoH8hb`);
  }
  
  getfood(name:string,query:string):Observable<any>{
    return Observable.create((observer:Observer<Food>)=>{
      this.getfoods(query).subscribe(data=>{
        this.foods=data['list']['item'];
        const fd=this.foods.find(food=>food.name==name);
        observer.next(fd);
      });
    });
  }
  addFavorite(food:Food):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,food);
  }
}
