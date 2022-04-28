import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacaoExclusaoComponent } from './modal-confirmacao-exclusao.component';

describe('ModalConfirmacaoExclusaoComponent', () => {
  let component: ModalConfirmacaoExclusaoComponent;
  let fixture: ComponentFixture<ModalConfirmacaoExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmacaoExclusaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmacaoExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
