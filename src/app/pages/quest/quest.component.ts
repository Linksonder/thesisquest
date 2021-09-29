import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth.service';
import { StoreService } from 'src/app/providers/store.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public value: String;
  public paper: any;
  public question: any;
  public quest: any;

  private sub: Subscription;


  public questions : any = {
    "rq": "What is the research question of the paper?",
    "conclusion": "What is the most important conclusion of the paper?",
    "futureWorks": "What kind of research do the authors recommend in the future?",
    "isQuantative": "Is the paper qualitative or quantitative?",
    "methodology": "What mythodology is used for this paper?",
  }


  updateQuest(quest : any){
    if(this.sub)
      this.sub.unsubscribe();

    this.quest = quest;

    this.sub = this.store.collection('papers').doc(quest.paper.id).valueChanges({idField: 'id'}).subscribe(paper => {
      this.paper = paper;
      this.question = this.getNextQuestion();
    })
  }



  constructor(public auth: AuthService, private store: StoreService) { }

  ngOnInit(): void {
  }

  

  submit(value: String){
    let update : any = {};
    update[this.question.key] = value;
    this.store.collection('papers').doc(this.paper.id).update(update);
    this.value = "";
  }

  claim(){
    this.store.collection('quests').doc(this.quest.id).update({ isComplete: true });
  }

  getNextQuestion(){
    if(!this.paper.rq)
    {
      return { key: 'rq', index: 0 };
    }
    else if(!this.paper.conclusion)
    {
      return { key: 'conclusion', index: 1 };
    }
    else if(!this.paper.futureWorks)
    {
      return { key: 'futureWorks', index: 2 };
    }
    else if(!this.paper.isQuantative)
    {
      return { key: 'isQuantative', index: 3 };

    }
    else if(!this.paper.methodology)
    {
      return { key: 'methodology', index: 4 };
    }
    return { complete: true };;
  }

}
