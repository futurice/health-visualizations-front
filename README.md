# Lääketutka frontend

Related repos: 
* https://github.com/futurice/health-visualizations
* https://github.com/futurice/laaketutka-prereqs

This repository contains the code for the web service frontend

Stack:
* react
* react-router v4
* testcafe

### Running

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

- Install npm and nodejs, for example with nvm:
	- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
	- `nvm install node`
- Navigate to project folder and:
	1. `npm install`
	2. `npm start`
	3. The frontend should show up at `http://localhost:3000`

By default, the frontend connects to the staging backend on the cloud. If you want to change it to e.g. localhost, run `cp .env .env.local` and edit the URL in .env.local.

### Testing

We use [testcafe](https://github.com/DevExpress/testcafe) for tests, running them should be as simple as:
* `npm install`
* `npm start`
* In another terminal tab: `npm test`

## Deploying

We use [surge.sh](http://surge.sh/) for deployment.
1. Install `surge`, `npm install -g surge`
2. `surge login` (username and password in the passwordsafe)
3. `npm run deploy-staging` or `npm run deploy-production`

[Staging](https://nettipuoskari-staging.surge.sh), [Production](https://www.laaketutka.fi/)