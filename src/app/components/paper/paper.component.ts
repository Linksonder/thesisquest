import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {

  @Input()
  public paper: any;

  constructor() { }

  ngOnInit(): void {
  }

  open(paper : any){
    let url = "https://scholar.google.com/scholar?q=" + encodeURIComponent(paper.title) + encodeURIComponent(" ") + encodeURIComponent(paper.authors);
    window.open(url, '_blank').focus();
  }

}
