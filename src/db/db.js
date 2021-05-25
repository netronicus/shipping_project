require("dotenv").config({ path: __dirname + "/../../.env" });
const { Sequelize, DataTypes } = require("sequelize");

class Database {
	constructor(){
		console.log(__dirname + "/.env");
		this.connection = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
      }
    );

		this.Shipping = this.connection.define('Shipping',{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			customer: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			descrip: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			status: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			origin_lat: {
				type: DataTypes.DECIMAL(11,8),
				allowNull: false
			},
			origin_long: {
				type: DataTypes.DECIMAL(11,8),
				allowNull: false
			},
			current_lat: {
				type: DataTypes.DECIMAL(11,8),
				allowNull: false
			},
			current_long: {
				type: DataTypes.DECIMAL(11,8),
				allowNull: false
			},
			end_lat: {
				type: DataTypes.DECIMAL(11,8),
				allowNull: false
			},
			end_long: {
				type: DataTypes.DECIMAL(11,8),
				allowNull: false
			},
		});

		this.connection.sync();
	}

	/**
	 * 
	 * @returns {Sequelize} DB Connection
	 */
	getConnection(){
		return this.connection;
	}

	/**
	 * Inicia la conexión
	 */
	authenticate(){
		this.connection.authenticate();
	}

	/**
	 * Cierrra la conexión
	 */
	close(){
		this.connection.close();
	}

}

module.exports = Database;