import { NotImplementedError } from '../errors/index.mjs';

export default class RepoBase {
  #repo;
  #authData;

  constructor() {}

  async createPullRequest() {
    throw new NotImplementedError();
  }
}
