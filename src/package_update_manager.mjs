import { PackageUpdater } from './package_updater/index.mjs';

export default class PackageUpdateManager {
  constructor(repo, masterBranchName, args) {
    this.packageName = args.packageName;
    this.version = args.version;
    this._repo = repo;
    this._masterBranchName = masterBranchName;
    this._updater = new PackageUpdater(this.packageName, this.version, this._masterBranchName);
  }

  async run() {
    console.log(`Updating ${this.packageName} to version ${this.version}...`);
    await this._updater.updatePackage();
    console.log(`${this.packageName}@${this.version} updated.`);


    console.log(`Creating a PR...`);
    await this._repo.createPullRequest(
      `Update ${this._updater.packageName} to ${this._updater.packageVersion}`,
      `Automated update of ${this._updater.packageName} to version ${this._updater.packageVersion}`,
      this._updater.branchName,
    );

    return this._updater.branchName;
  }
}