# BCON

### Table of contents
- [1) Introduction](#1-introduction)
- [2) Getting started](#2-getting-started)
- [3) npm package information](#3-npm-package-information)
- [4) Directory Structure](#4-directory-structure)
- [5) Web browser support scope](#5-web-browser-support-scope)
- [6) Contributing](#7-contributing)

### 1) Introduction
BCON is a contents management DApp. This is connected with Storage-server and Verifier-server.

(This project is only running on user-side.)

### 2) Getting started
1. Open terminal
2. Clone the repo by running `git clone https://github.com/zzerous/BCON-user.git`
3. Run `npm install`to install node packages
4. Run `npm run local`
5. App should be running in https://localhost:8000

### 3) npm package information
> dependencies
```
The klaystagram project is optimized for caver-js version "1.1.2".
caver-js needs confirmation before updating.
```

### 4) Directory Structure
> Folder structure
```
webpack.base.js         // Base webpack settings
webpack.dev.js          // Settings for local development
webpack.prod.js         // Settings for build. (note: NODE_ENV= must be set to production)

dist                    // Files built with 'npm run build'
static                  // Contains static resources (index.html, images, font files etc...)

1. src
src - pages             // React page components (or containers)
src - components        // React components
src - constants         // Constants used throughout the project
src - klaytn            // Klaytn related definition folder
src - redux             // Redux settings (reducers, actions, store.js)
src - styles            // Style util files. Contains color, size, font info and etc. as well as Sass at-rules
src - utils             // Miscellaneous helper functions used throughout the source code
index.js                // Project build entry point.
index.scss              // .scss file for index.js mentioned above.
```

### 5) Web browser support scope
> Supported browsers.

Chrome | Safari | Firefox | IE Edge*
---------------------- | ---------------------- | ---------------------- | ----------------------
Supported (Optimized) | Supported | Supported | Not supported


### 7) Contributing

As an open source project, Klaytnwallet is always welcoming your contribution. Please read our [CONTTIBUTING.md](./CONTRIBUTING.md) for a walk-through of the contribution process.
