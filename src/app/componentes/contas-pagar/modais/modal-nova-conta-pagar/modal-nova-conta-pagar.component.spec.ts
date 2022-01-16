import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovaContaPagarComponent } from './modal-nova-conta-pagar.component';

describe('ModalNovaContaPagarComponent', () => {
  let component: ModalNovaContaPagarComponent;
  let fixture: ComponentFixture<ModalNovaContaPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNovaContaPagarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNovaContaPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
