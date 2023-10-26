# Hello to xegr build with React!

I am excited to share this project that highlights some of my basic React skils and showcases my passion for creating interactive and user-friendly web applications.

# Project Overview

Xegr is a React-based web application designed with React. It was built with a focus on performance, responsiveness, and a seamless user experience.

# Front-end

## Available front-end Scripts

### `npm start`

Runs in development mode. [http://localhost:3000](http://localhost:3000).

### `npm test`

Starts Jest.

### `npm run build`

Builds the app for production to the `build` folder.

# Back-end

In order to run the back-end you should run (Start the front-end first):

1. `cd server`
2. `npm start`

## MySQL database

In order to save Property records to MySQL DB you should:

1. Start a MySQL server

- You can do it with Docker easily for example (MacOS data structure):
- `mkdir -p /Users/<USERFOLDER>/DockerData/MySQL/8.0`
  - `docker run --restart always --name mysql8.0 -v /Users/<USERFOLDER>/DockerData/MySQL/8.0:/var/lib/mysql -p 3306:3306 -d -e MYSQL_ROOT_PASSWORD=thisisastrongpass mysql:8.0`

2. Create server/config/config.json with content:

```json
{
	"development": {
		"username": "root",
		"password": "thisisastrongpass",
		"database": "xegr",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
```

3. Run migration `npx sequelize db:migrate`
