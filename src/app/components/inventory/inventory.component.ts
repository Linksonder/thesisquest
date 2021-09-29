import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  @Input()
  public papers: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }



}
