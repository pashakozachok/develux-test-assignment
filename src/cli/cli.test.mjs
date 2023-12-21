import { describe, expect, it, jest } from '@jest/globals';
import fs from 'node:fs';
import {
  validateNpmVersion,
  validateConfigFileExists,
  validatePackageExist,
} from './index.mjs';

jest.mock('node:fs');
jest.mock('sync-fetch', jest.fn());

describe('validateNpmVersion', () => {
  it('should return true for a valid npm version', () => {
    expect(validateNpmVersion('1.2.3')).toBe(true);
  });

  it('should throw an error for an invalid npm version', () => {
    expect(() => validateNpmVersion('invalid-version')).toThrowError(
      'Error: Invalid npm version. Please provide a valid semantic version (X.Y.Z).'
    );
  });
});

describe('validateConfigFileExists', () => {
  it('should return true if the config file exists', () => {
    fs.existsSync = jest.fn(() => true);
    expect(validateConfigFileExists('valid-config.json')).toBe(true);
  });

  it('should throw an error if the config file does not exist', () => {
    fs.existsSync = jest.fn(() => false);
    expect(() =>
      validateConfigFileExists('nonexistent-config.json')
    ).toThrowError('Error: Invalid config file path.');
  });
});

describe('validatePackageExist', () => {
  it('should return true if the package exists on npm.io', async () => {
    expect(validatePackageExist('test-package', '0.0.1')).toBe(true);
  });

  it('should throw an error if the package does not exist on npm.io', async () => {
    try {
      validatePackageExist('nonexistent-package', '1.0.0');
    } catch (e) {
      expect(e.message).toBe(
        'Error: Check if the nonexistent-package@1.0.0 exists on npm.io'
      );
    }
  });
});
