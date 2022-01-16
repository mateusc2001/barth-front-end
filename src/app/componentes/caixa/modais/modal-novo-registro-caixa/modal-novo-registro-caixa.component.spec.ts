import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoRegistroCaixaComponent } from './modal-novo-registro-caixa.component';

describe('ModalNovoRegistroCaixaComponent', () => {
  let component: ModalNovoRegistroCaixaComponent;
  let fixture: ComponentFixture<ModalNovoRegistroCaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNovoRegistroCaixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNovoRegistroCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
