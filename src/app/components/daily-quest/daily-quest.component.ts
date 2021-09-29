import { Component, Input, OnInit, Output, EventEmitter, Type } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StoreService } from 'src/app/providers/store.service';
import { first, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-daily-quest',
  templateUrl: './daily-quest.component.html',
  styleUrls: ['./daily-quest.component.scss']
})
export class DailyQuestComponent implements OnInit {

  @Input()
  public type = '';

  @Output()
  public questChange: EventEmitter<any> = new EventEmitter();

  public quest$ : Observable<any>;
  public new = false;

  constructor(public store: StoreService) { }

  ngOnInit(): void {

    this.quest$ = this.store.collection('quests').doc(this.shortDate()).valueChanges({idField: 'id'});
    this.quest$.subscribe(q => {
      this.questChange.emit(q);
    });

  }

  openDaily(){
    this.store.collection('papers').valueChanges({idField: 'id'}).pipe(first()).subscribe(papers => {
      papers = papers.filter(p => !p.methodology)
      let random = Math.floor(Math.random() * papers.length);
      let paperId = papers[random];

      this.store.collection('quests').doc(this.shortDate()).set({
        points: 800, 
        paper: papers[random]
      })

      this.new = true;

    })

  }

  public getTimer(quest : any){
    let date = new Date(quest.id);
    date.setHours(23);
    date.setMinutes(59);
    const oldDate : any = Date.now();
    const newDate : any = date;
    const msToTime = (ms : any) => ({
        hours: Math.trunc(ms/3600000),
        minutes: Math.trunc((ms/3600000 - Math.trunc(ms/3600000))*60) + ((ms/3600000 - Math.trunc(ms/3600000))*60 % 1 != 0 ? 1 : 0)
    })
    return msToTime(Math.abs(newDate-oldDate));
  }

  private shortDate(){
    let date = (new Date()).toLocaleDateString('en-US');
    return date.replace(/\//g,  '-'); //regex to find frontslashes
  }

}
