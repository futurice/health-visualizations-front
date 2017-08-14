Instructions:
- Install npm and nodejs, for example with nvm:
	- curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
	- nvm install node
- Navigate to project folder and:
  - npm install
	- npm start


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# Deploying

* `npm run build`
* `cd build`
* `surge` or `surge --domain nettipuoskari-staging.surge.sh` for staging
