import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/_interfaces/Tag';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags?: Observable<Tag[]>;
  
  constructor(foodService: FoodService) {
    this.tags = foodService.getAllTags();
  }

  ngOnInit(): void {}
}
