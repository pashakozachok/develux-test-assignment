import { NotImplementedError } from '../errors/index.mjs';

export default class RepoBase {
  constructor() {}

  async createPullRequest() {
    throw new NotImplementedError();
  }
}
