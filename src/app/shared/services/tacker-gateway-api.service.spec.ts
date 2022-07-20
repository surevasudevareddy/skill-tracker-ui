import { TestBed } from '@angular/core/testing';

import { TackerGatewayApiService } from './tacker-gateway-api.service';

describe('TackerGatewayApiService', () => {
  let service: TackerGatewayApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TackerGatewayApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
