import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyQuestComponent } from './daily-quest.component';

describe('DailyQuestComponent', () => {
  let component: DailyQuestComponent;
  let fixture: ComponentFixture<DailyQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
