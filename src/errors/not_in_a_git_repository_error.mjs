export default class NotInAGitRepositoryError extends Error {
  constructor() {
    super(`Not in a Git repository. Aborting.`);
  }
}