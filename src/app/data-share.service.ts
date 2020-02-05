import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private graphData = new BehaviorSubject<any>('');
  
  constructor() { }

  getGraphData(): Observable<any> {
      return this.graphData.asObservable();
  }

  setGraphData(action: any) {
      this.graphData.next(action);
  }

}
