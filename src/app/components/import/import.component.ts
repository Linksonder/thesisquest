import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/providers/store.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  public show: boolean = false; 

  public file: any;
  public papers: any[]
  public inventory: any[]

  constructor(private store: StoreService) { 
    
  }

  ngOnInit(): void {
    this.store.collection('papers').valueChanges().subscribe(p => {
      this.inventory = p;
    })
  }

  import(){
    this.papers.forEach(p => {
      this.store.collection('papers').add(p);
    })
    this.papers = null;
  }

  fileChangeListener($e: any): void {
    
    this.file = $e.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload = (e) => {

      let papers = this.csvToArray(fileReader.result as string);
      papers = papers.map(p => { return { title: p.title, authors: p.authors}})

      if(!this.inventory)
        this.papers = papers;
      else 
        this.papers = papers.filter(p => this.inventory.filter(i => i.title == p.title).length == 0); //found 0

    }

    fileReader.readAsText(this.file);

  }

  //https://sebhastian.com/javascript-csv-to-array/
  csvToArray(str: string, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(s => s.toLowerCase())
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    let rows = str.slice(str.indexOf("\n") + 1).split("\n");
    rows = rows.filter(r => r.length > 0);
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map((row) => {
      const values : any = this.smartSplit(row, delimiter);
      const el = headers.reduce((object : any, header, index: number) => {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }

  /** Smart split method to deal with substrings */
  smartSplit(str: string, delimter: string) : any
  {
    let result = [];
    let subString = false;
    let part = "";
    for (var i = 0; i < str.length; i++) {
      let char = str.charAt(i);
      
      if(char == "\"")
        subString = !subString;
      else if(!subString && char == delimter){
        result.push(part);
        part = "";//reset
      }
      else {
        part += char;
      }

    }
    return result;
  }

}
