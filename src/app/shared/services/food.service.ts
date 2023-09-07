import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from 'src/app/_interfaces/Food';
import { Tag } from 'src/app/_interfaces/Tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class FoodService {

  private apiUrl = environment.urlAddress;
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.getAll().pipe(map(foods => foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))));
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return this.getAll().pipe(map(foods => tag === 'All' ? foods : foods.filter(food => food.tags?.includes(tag))));
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.getAll().pipe(map(foods => foods.find(food => food.id === foodId) ?? new Food()));
  }
}

