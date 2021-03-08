import { TestBed } from '@angular/core/testing';

import { ProjectStatusesService } from './project-statuses.service';

describe('ProjectStatusesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectStatusesService = TestBed.get(ProjectStatusesService);
    expect(service).toBeTruthy();
  });
});
