import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovaContaReceberComponent } from './modal-nova-conta-receber.component';

describe('ModalNovaContaReceberComponent', () => {
  let component: ModalNovaContaReceberComponent;
  let fixture: ComponentFixture<ModalNovaContaReceberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNovaContaReceberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNovaContaReceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
