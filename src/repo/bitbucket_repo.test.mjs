// bitbucket_repo.test.mjs
import { jest, describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { BitBucketRepo } from './index.mjs';
import RepoBase from './repo_base.mjs';

jest.mock('./repo_base.mjs');

describe('BitBucketRepo', () => {
  let bitBucketRepo;

  beforeEach(() => {
    bitBucketRepo = new BitBucketRepo({ token: 'test-token' }, { repoSlug: 'test-repo', workspace: 'test-workspace' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create an instance of BitBucketRepo', () => {
    expect(bitBucketRepo).toBeInstanceOf(BitBucketRepo);
    expect(bitBucketRepo).toBeInstanceOf(RepoBase);
  });
});