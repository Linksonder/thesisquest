import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNormalComponent } from './login-normal.component';

describe('LoginNormalComponent', () => {
  let component: LoginNormalComponent;
  let fixture: ComponentFixture<LoginNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
