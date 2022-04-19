import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDevComponent } from './info-dev.component';

describe('InfoDevComponent', () => {
  let component: InfoDevComponent;
  let fixture: ComponentFixture<InfoDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
