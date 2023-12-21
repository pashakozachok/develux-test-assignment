import runCLI from './src/cli/index.mjs';
import PackageUpdateManager from './src/package_update_manager.mjs';
// TODO: implement other repos later
import { BitBucketRepo } from './src/repo/index.mjs';
import { BranchAlreadyExistsError, NotInAGitRepositoryError } from './src/errors/index.mjs';

const args = runCLI();
const { config } = args;

const bitBucketRepo = new BitBucketRepo(
  { token: config.BITBUCKET_AUTH_TOKEN },
  {
    workspace: config.BITBUCKET_WORKSPACE,
    repoSlug: config.BITBUCKET_REPO_SLUG,
  },
);
const packageUpdateManager = new PackageUpdateManager(bitBucketRepo, config.BITBUCKET_MASTER_BRANCH_NAME, args);

// Run the update process
(async () => {
  try {
    const branchName = await packageUpdateManager.run();
    console.log(`
    Package updated successfully. 
    PR created: 
    https://bitbucket.org/${config.BITBUCKET_WORKSPACE}/${config.BITBUCKET_REPO_SLUG}/branch/${branchName}
    `);
  } catch (e) {
    if (e instanceof BranchAlreadyExistsError) {
      console.error(e.message);
      console.error('You need to remove such branch in order to proceed the update.');
    }
    if (e instanceof NotInAGitRepositoryError) {
      console.error(e.message);
      console.error('You need to run the script in git repository.');
    }
    // TODO: add other error handling here
    console.error(e.message);
  }
})();
