// package_updater.test.mjs
import { jest, expect } from '@jest/globals';
import { execSync } from 'child_process';
import PackageUpdater from './package_updater.mjs';
import { BranchAlreadyExistsError, NotInAGitRepositoryError } from '../errors/index.mjs';

jest.mock('child_process', () => ({
  __esModule: true,
  execSync: jest.fn(),
}));

jest.mock('../errors/index.mjs', () => ({
  __esModule: true,
  BranchAlreadyExistsError: jest.fn(() => 'BranchAlreadyExistsError'),
  NotInAGitRepositoryError: jest.fn(() => 'NotInAGitRepositoryError'),
}));

describe('PackageUpdater', () => {
  let packageUpdater;

  beforeEach(() => {
    packageUpdater = new PackageUpdater('test-package', '1.0.0', 'main');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update the package', () => {
    packageUpdater._isGitRepository = jest.fn().mockImplementation(() => true);
    packageUpdater._switchToMaster = jest.fn();
    packageUpdater._discardChanges = jest.fn();
    packageUpdater._updatePackageVersion = jest.fn();
    packageUpdater._commitChanges = jest.fn();
    packageUpdater._createBranch = jest.fn();
    packageUpdater._pushBranch = jest.fn();

    packageUpdater.updatePackage();

    expect(packageUpdater._switchToMaster).toHaveBeenCalled();
    expect(packageUpdater._discardChanges).toHaveBeenCalled();
    expect(packageUpdater._updatePackageVersion).toHaveBeenCalled();
    expect(packageUpdater._commitChanges).toHaveBeenCalled();
    expect(packageUpdater._createBranch).toHaveBeenCalled();
    expect(packageUpdater._pushBranch).toHaveBeenCalled();
  });

  it('should throw BranchAlreadyExistsError if branch already exists', () => {
    packageUpdater._checkBranchExists = jest.fn(() => true);

    expect(() => packageUpdater._createBranch()).toThrow(BranchAlreadyExistsError);
  });
});
