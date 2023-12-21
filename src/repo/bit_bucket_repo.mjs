import RepoBase from './repo_base.mjs';
import bb from 'bitbucket';

export default class BitBucketRepo extends RepoBase {
  constructor(authData, repo) {
    super();
    this._repo = repo;
    this._bitBucketInstance = new bb.Bitbucket({
      auth: {
        token: authData.token,
      },
    });
  }

  /**
   * @param {String} title
   * @param {String} description
   * @param {String} sourceBranch
   * @returns {Promise<string>}
   */
  async createPullRequest(title, description, sourceBranch) {
    await this._bitBucketInstance.repositories.createPullRequest({
      _body: {
        title,
        source: {
          branch: {
            name: sourceBranch,
          },
        },
      },
      repo_slug: this._repo.repoSlug,
      workspace: this._repo.workspace,
    });
  }
}
