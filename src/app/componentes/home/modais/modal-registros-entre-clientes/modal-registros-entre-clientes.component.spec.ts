import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrosEntreClientesComponent } from './modal-registros-entre-clientes.component';

describe('ModalRegistrosEntreClientesComponent', () => {
  let component: ModalRegistrosEntreClientesComponent;
  let fixture: ComponentFixture<ModalRegistrosEntreClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistrosEntreClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistrosEntreClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
