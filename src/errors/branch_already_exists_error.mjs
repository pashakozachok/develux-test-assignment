export default class BranchAlreadyExistsError extends Error {
  constructor(branchName) {
    super(`Branch "${branchName}" already exists. Aborting.`);
  }
}