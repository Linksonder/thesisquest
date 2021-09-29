import { mergeNsAndName } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';
import { StoreService } from 'src/app/providers/store.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  papers: any[];
  points$: any;

  constructor(public auth: AuthService, public store: StoreService) { 
  }


  ngOnInit(): void {
    this.auth.user$.pipe(mergeMap(user => {
      if(user)
        return this.store.collection('papers').valueChanges()
      else
        return null;
    })).subscribe(papers => {
      this.papers = papers;
    })   

    this.points$ = this.auth.user$.pipe(mergeMap(user => {
      if(user)
        return this.store.collection('quests').valueChanges()
      else
        return null;
    })).pipe(map(quests => {
      let totalPoints = 0;
      quests.filter(q => q.isComplete).forEach(q => totalPoints += q.points);
      return totalPoints;
    }))

  }

}
