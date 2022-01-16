import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAplicarRegistroExtratoComponent } from './modal-aplicar-registro-extrato.component';

describe('AplicarRegistroExtratoComponent', () => {
  let component: ModalAplicarRegistroExtratoComponent;
  let fixture: ComponentFixture<ModalAplicarRegistroExtratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAplicarRegistroExtratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAplicarRegistroExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
