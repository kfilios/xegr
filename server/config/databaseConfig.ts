const databaseConfig = {
	morganFormat: "dev",
	sequelizeSync: true,
	sequelizeLogging: true,
	sequelizeSyncForce: false,
	sequelizeSyncAlter: true,
	database: {
		dialect: "mysql",
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	}
};

export default databaseConfig;
