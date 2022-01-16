import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratosPreAprovadosComponent } from './extratos-pre-aprovados.component';

describe('ExtratosPreAprovadosComponent', () => {
  let component: ExtratosPreAprovadosComponent;
  let fixture: ComponentFixture<ExtratosPreAprovadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratosPreAprovadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratosPreAprovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
