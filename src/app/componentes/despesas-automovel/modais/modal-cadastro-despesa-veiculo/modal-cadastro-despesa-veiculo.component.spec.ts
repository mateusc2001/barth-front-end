import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroDespesaVeiculoComponent } from './modal-cadastro-despesa-veiculo.component';

describe('ModalCadastroDespesaVeiculoComponent', () => {
  let component: ModalCadastroDespesaVeiculoComponent;
  let fixture: ComponentFixture<ModalCadastroDespesaVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroDespesaVeiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastroDespesaVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
