import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { Http } from '@angular/http';

const httpStub = {
  get() {

  }
};

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        {provide: Http, useValue: httpStub}
      ]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
