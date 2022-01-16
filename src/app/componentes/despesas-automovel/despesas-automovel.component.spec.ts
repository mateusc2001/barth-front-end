import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasAutomovelComponent } from './despesas-automovel.component';

describe('DespesasAutomovelComponent', () => {
  let component: DespesasAutomovelComponent;
  let fixture: ComponentFixture<DespesasAutomovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespesasAutomovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesasAutomovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
