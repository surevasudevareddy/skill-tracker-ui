import { TestBed } from '@angular/core/testing';

import { TrackerGatewayApiService } from './tracker-gateway-api.service';

describe('TackerGatewayApiService', () => {
  let service: TrackerGatewayApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerGatewayApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
