import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  constructor() {}

  public get urlAddress(): string {
    return environment.urlAddress;
  }
}
