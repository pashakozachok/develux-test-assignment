# PackageUpdater

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Configs](#configs)
- [How To Use] (#how-to-use)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Linting and Code Formatting](#linting-and-code-formatting)
- [Node Version Management](#node-version-management)

## Introduction

Project Name is a PackageUpdater. It aims to update the packages in your git repo.

## Configs
You need to copy [config.sample.json](config%2Fconfig.sample.json)` file and replace the values with your own.

## Setup

To set up and run this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. Change directory to your project:

    ```bash
    cd your-repo
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## How To Use
You need to run the script in the project folder (git should be initialized). 
```
node <path to script>/index.mjs update [package-name] [version]

Options:
  --package-name  Name of the package                        [string] [required]
  --version       Version of the package                     [string] [required]
  --config        Config file path                          [string] [required]
```

## Folder Structure
```config/ # Configuration files
node_modules/ # Node.js dependencies
src/ # Source code
index.mjs # Main entry point
.eslintrc.json # ESLint configuration
.gitignore # Git ignore file
.nvmrc # Node Version Manager configuration
.prettierrc.json # Prettier configuration
index.mjs # Main entry point
jest.config.js # Jest configuration
package.json # Node.js project configuration
package-lock.json # Lock file for Node.js dependencies
```

## Scripts

This project uses the following npm scripts:

- `npm run test`: Runs project tests.
- `npm run lint`: Runs ESLint to check for code style issues.
- `npm run lint:write`: Runs ESLint to check for code style issues and fix them.
- `npm run prettier`: Formats the code using Prettier.

## Linting and Code Formatting

This project uses ESLint for linting and Prettier for code formatting. To lint and format the code, run the following commands:

```bash
npm run lint        # Run ESLint
npm run lint:write  # Run ESLint and fix errors
npm run format      # Run Prettier
```

## Node Version Management
This project uses an .nvmrc file to specify the Node.js version. To use the recommended version, run:
```bash
nvm use
```

