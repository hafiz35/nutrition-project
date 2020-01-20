import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from '../models/food.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  baseUrl:string="http://localhost:9080/favorites-service/favorites"
  filter = new Subject();
  foods:Food[];
  token:string;
  foodToView:Food;
  addToFavorite:boolean=true;
  constructor(private httpClient:HttpClient,private authService:AuthService) { }
  
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
  addFavorite(food:Food,username:string):Observable<any>{
    this.token=this.authService.getToken();
    let headers=new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+this.token);
    return this.httpClient.post(`${this.baseUrl}/${username}`,food,{headers});
  }
  getFavoritesBasedOnUsername(username:string){
    this.token=this.authService.getToken();
    let headers=new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+this.token);
    return this.httpClient.get<Food[]>(`${this.baseUrl}/${username}`,{headers});
  }

  getFavoriteExistBasedOnUsername(username:string,food:Food){
    this.token=this.authService.getToken();
    let headers=new HttpHeaders();
    headers=headers.set('Authorization','Bearer '+this.token);
    return this.httpClient.get<boolean>(`${this.baseUrl}/${username}/${food.offset}`,{headers});
  }

  getnutrients(ndbno:number):Observable<any>{
    return this.httpClient.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=jjPhNaKUJhs5hzT25Eh0FhYlktzwUYdk9DhoH8hb`);
  }

 
}
