import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheContaFixaComponent } from './detalhe-conta-fixa.component';

describe('DetalheContaFixaComponent', () => {
  let component: DetalheContaFixaComponent;
  let fixture: ComponentFixture<DetalheContaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheContaFixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheContaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
