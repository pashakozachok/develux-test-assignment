import fs from 'node:fs';
import process from 'node:process';
import yargs from 'yargs/yargs';
import fetch from 'sync-fetch';

export const validateNpmVersion = (value) => {
  const npmVersionRegex = /^\d+\.\d+\.\d+$/; // Example regex for semantic versioning (X.Y.Z)

  if (!npmVersionRegex.test(value)) {
    throw new Error(
      'Error: Invalid npm version. Please provide a valid semantic version (X.Y.Z).'
    );
  }

  return true;
};

export const validateConfigFileExists = (value) => {
  if (fs.existsSync(value)) {
    return true;
  } else {
    throw new Error('Error: Invalid config file path.');
  }
};

export const validatePackageExist = (packageName, packageVersion) => {
  const registryUrl = `https://registry.npmjs.org/${packageName}`;
  let exists = false;

  try {
    const response = fetch(registryUrl);
    const data = response.json();

    const versions = data.versions || {};
    exists = packageVersion in versions;
  } catch (error) {
    exists = false;
  }

  if (exists) return exists;
  throw new Error(
    `Error: Check if the ${packageName}@${packageVersion} exists on npm.io`
  );
};

const runCLI = () => {
  const { argv } = yargs(process.argv.slice(2))
    .usage('$0 update [package-name] [version]')
    .version(false)
    .option('package-name', {
      describe: 'Name of the package',
      demandOption: true,
      type: 'string',
    })
    .option('version', {
      describe: 'Version of the package',
      demandOption: true,
      type: 'string',
      validate: validateNpmVersion,
    })
    .option('config', {
      describe: 'Config file path',
      demandOption: true,
      type: 'string',
      validate: validateConfigFileExists,
    })
    .check(({ version }) => validateNpmVersion(version))
    .check(({ config }) => validateConfigFileExists(config))
    .check(({ packageName, version }) =>
      validatePackageExist(packageName, version)
    )
    .help();

  const config = JSON.parse(fs.readFileSync(argv.config).toString());

  return {
    ...argv,
    config,
  };
};

export default runCLI;
