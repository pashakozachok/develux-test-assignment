// package_update_manager.test.mjs
import { afterEach, beforeEach, describe, expect, jest } from '@jest/globals';
import PackageUpdateManager from './package_update_manager.mjs';

// Mock the 'package_updater' module
jest.mock('../src/package_updater/index.mjs', {
  _esModule: true,
  default: {
    updatePackage: jest.fn(),
    branchName: 'update-test-package-1.0.0',
    packageName: 'test-package',
    packageVersion: '1.0.0',
    _isGitRepository: jest.fn().mockImplementation(() => true),
  },
});

describe('PackageUpdateManager', () => {
  let repoMock;
  const masterBranchName = 'master';
  const packageName = 'test-package';
  const version = '1.0.0';

  beforeEach(() => {
    // Create mock instances for each test
    repoMock = {
      createPullRequest: jest.fn(),
    };
  });

  afterEach(() => {
    // Clear mock calls after each test
    jest.clearAllMocks();
  });

  it('should create an instance of PackageUpdateManager', () => {
    const manager = new PackageUpdateManager(repoMock, masterBranchName, { packageName, version });

    expect(manager).toBeInstanceOf(PackageUpdateManager);
  });

  it('should run the update process successfully', async () => {
    const manager = new PackageUpdateManager(repoMock, masterBranchName, { packageName, version });
    manager._updater._isGitRepository = () => true;
    manager._updater._switchToMaster = () => true;
    manager._updater._switchToMaster = () => true;
    manager._updater._discardChanges = () => true;
    manager._updater._updatePackageVersion = () => true;
    manager._updater._commitChanges = () => true;
    manager._updater._createBranch = () => true;
    manager._updater._pushBranch = () => true;
    manager._updater.updatePackage = jest.fn();


    await manager.run();

    // Check that PackageUpdater constructor was called with the correct arguments
    expect(manager._updater.packageName).toBe(packageName);
    expect(manager._updater.packageVersion).toBe(version);
    expect(manager._updater.masterBranchName).toBe(masterBranchName);

    // Check that updatePackage method was called
    expect(manager._updater.updatePackage).toHaveBeenCalled();

    // Check that createPullRequest method was called with the correct arguments
    expect(repoMock.createPullRequest).toHaveBeenCalledWith(
      `Update ${packageName} to ${version}`,
      `Automated update of ${packageName} to version ${version}`,
      manager._updater.branchName,
    );
  });
});
