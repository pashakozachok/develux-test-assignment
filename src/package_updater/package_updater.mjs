import { execSync } from 'child_process';
import {
  BranchAlreadyExistsError,
  NotInAGitRepositoryError,
} from '../errors/index.mjs';

const TEMP_BRANCH_NAME = 'temp-branch';

export default class PackageUpdater {
  constructor(packageName, packageVersion, masterBranchName) {
    this.packageName = packageName;
    this.packageVersion = packageVersion;
    this.branchName = `update-${packageName}-${packageVersion}`;
    this.masterBranchName = masterBranchName;

    this.updatePackage = this.updatePackage.bind(this);
  }

  _isGitRepository() {
    try {
      execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  updatePackage() {
    if (!this._isGitRepository()) throw new NotInAGitRepositoryError();
    this._switchToMaster();
    this._discardChanges();
    this._updatePackageVersion();
    this._commitChanges();
    this._createBranch(this.branchName);
    this._pushBranch();
  }

  _switchToMaster() {
    execSync(`git checkout ${this.masterBranchName}`, { stdio: 'ignore' });
    if (this._checkBranchExists(TEMP_BRANCH_NAME)) {
      execSync(`git branch -D ${TEMP_BRANCH_NAME}`, { stdio: 'ignore' });
    }
    execSync(`git checkout -b ${TEMP_BRANCH_NAME}`, { stdio: 'ignore' });
    execSync(`git branch -D ${this.masterBranchName}`, { stdio: 'ignore' });
    execSync(`git fetch origin ${this.masterBranchName}`, { stdio: 'ignore' });
    execSync(
      `git checkout -b ${this.masterBranchName} --track origin/${this.masterBranchName}`,
      { stdio: 'ignore' }
    );
    execSync(`git branch -D ${TEMP_BRANCH_NAME}`, { stdio: 'ignore' });
  }

  _discardChanges() {
    execSync('git reset --hard HEAD', { stdio: 'ignore' });
    execSync('git clean -fd', { stdio: 'ignore' });
  }

  _updatePackageVersion() {
    execSync(`npm install ${this.packageName}@${this.packageVersion} --save`, {
      stdio: 'ignore',
    });
  }

  _commitChanges() {
    execSync(`git add package.json`);
    execSync(
      `git commit -m "chore: update ${this.packageName} to ${this.packageVersion}"`,
      { stdio: 'ignore' }
    );
  }

  _checkBranchExists(branchName) {
    try {
      execSync(`git rev-parse --verify ${branchName}`, { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  }

  _createBranch() {
    if (this._checkBranchExists(this.branchName)) {
      throw new BranchAlreadyExistsError(this.branchName);
    }

    execSync(`git checkout -b ${this.branchName}`, { stdio: 'ignore' });
  }

  _pushBranch() {
    execSync(`git push -f origin ${this.branchName}`, { stdio: 'ignore' });
  }
}
