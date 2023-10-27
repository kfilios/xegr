import { Sequelize, Options } from "sequelize";
import databaseConfig from "./databaseConfig";

const mysqlOptions: Options = {
	dialect: "mysql",
	pool: {
		max: databaseConfig.database.pool.max,
		min: databaseConfig.database.pool.min,
		acquire: databaseConfig.database.pool.acquire,
		idle: databaseConfig.database.pool.idle
	},
	define: {
		underscored: true,
		freezeTableName: true
	},
	logging: databaseConfig.sequelizeLogging ? console.log : false
};

export const sequelize = new Sequelize(
	String(process.env.DB_NAME),
	String(process.env.DB_USER),
	String(process.env.DB_PASSWORD),
	{
		...mysqlOptions,
		host: String(process.env.DB_HOST)
	}
);
