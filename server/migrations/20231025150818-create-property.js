/** @type {import('sequelize-cli').Migration} */

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Property", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			type: {
				type: Sequelize.STRING
			},
			area: {
				type: Sequelize.STRING
			},
			placeId: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable("Property");
	}
};
