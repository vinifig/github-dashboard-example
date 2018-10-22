# Github Dashboard Example

> Github dashboard built in with Razzle and React

This project consist of two modules:
    * app
    * api (`BFF API` and static file server for app)

## Modules

### App Module
The app module is a react and redux application

### Api Module
The api module is a http server responsible for:
    
* Serve app module source files in `/dashboard`
* Perform the server-rendering operation
* Retrieve and provide Github data to application
    * All the GitHub data is pre processed on server to avoid bandwidth consuption
    * `/user` endpoint only accept get operations (check `src/api/controllers/userController.js`)

### Requirements

```
* Git
* Node.js 8.x
* GitHub Account
```

## Running Locally

Run the command above
```sh
git clone https://github.com/vinifig/github-dashboard-example
cd github-dashboard-example
npm install
npm start
```

Then open your browser on http://localhost:3000 (default port)

## Custom Settings

The GitHub Api has some restrictions like the rate-limit requests. 
To avoid unavailability of the system you can set your `GitHub Credentials` in a `.env` file (check `.env.example`).

Example of .env: 

```
USERNAME=user
PASSWORD=pass
PORT=3000
```

## Build to Prod

```sh
# Build source into ./build folder
npm run build
```

```sh
# Build and run
npm run build:start
```

## Running example

You can try a live example in [https://github-dashboard-example.herokuapp.com/](https://github-dashboard-example.herokuapp.com/)

## TODO

* Verify razzle vulnerability
    * [https://github.com/jaredpalmer/razzle/issues/757](https://github.com/jaredpalmer/razzle/issues/757)
* Refactor components structure
    * Analyze all structures for Repositories and related components
* resolve layout responsivity problems:
    * Add two columns
        * userProfile
        * userRepositoryData
    * Ensure that users columns are getting one below the other in small screens
    * Ensure that users columns are getting aligned with each other in larger screens
    
* Add jsdoc comments to all modules and components
* Add jsdoc comments to all methods


