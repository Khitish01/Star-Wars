import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading: BehaviorSubject<boolean>
  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false)
  }
  public get loader() {
    return this.isLoading.value
  }
}
