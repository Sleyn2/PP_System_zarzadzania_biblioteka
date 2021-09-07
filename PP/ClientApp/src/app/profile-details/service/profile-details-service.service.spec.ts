import { TestBed } from '@angular/core/testing';

import { ProfileDetailsServiceService } from './profile-details-service.service';

describe('ProfileDetailsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileDetailsServiceService = TestBed.get(ProfileDetailsServiceService);
    expect(service).toBeTruthy();
  });
});
