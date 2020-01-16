import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  configUrl:string="https://api.nal.usda.gov/ndb/search/?format=json&q=&offset=0&api_key=jjPhNaKUJhs5hzT25Eh0FhYlktzwUYdk9DhoH8hb";
  filter = new Subject();
  foods:Food[];
  constructor(private httpClient:HttpClient) { }
  
  getfoods():Observable<any>{
    return this.httpClient.get(this.configUrl);
  }
  
  getfood(name:string):Observable<any>{
    return Observable.create((observer:Observer<Food>)=>{
      this.getfoods().subscribe(data=>{
        this.foods=data['list']['item'];
        const fd=this.foods.find(food=>food.name==name);
        observer.next(fd);
      });
    });
  }

}
