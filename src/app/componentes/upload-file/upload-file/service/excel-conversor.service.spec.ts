import { TestBed } from '@angular/core/testing';

import { ExcelConversorService } from './excel-conversor.service';

describe('ExcelConversorService', () => {
  let service: ExcelConversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelConversorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
