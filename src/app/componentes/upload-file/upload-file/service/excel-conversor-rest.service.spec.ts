import { TestBed } from '@angular/core/testing';

import { ExcelConversorRestService } from './excel-conversor-rest.service';

describe('ExcelConversorRestService', () => {
  let service: ExcelConversorRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelConversorRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
