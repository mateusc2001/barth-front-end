import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaContasFixasComponent } from './tabela-contas-fixas.component';

describe('TabelaContasFixasComponent', () => {
  let component: TabelaContasFixasComponent;
  let fixture: ComponentFixture<TabelaContasFixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaContasFixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaContasFixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
