import { Model, DataTypes, Sequelize } from "sequelize";

interface PropertyAttributes {
	title: string;
	type: number;
	area: string;
	placeId: string;
	price: number;
	description: string;
	createdAt: Date;
}

export interface PropertyInstance extends Model, PropertyAttributes {
	deletedAt: Date;
}

const Property = (sequelize: Sequelize) => {
	const Property = sequelize.define<PropertyInstance, PropertyAttributes>(
		"Property",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			type: {
				type: DataTypes.NUMBER,
				allowNull: false
			},
			area: {
				type: DataTypes.STRING,
				allowNull: false
			},
			placeId: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "placeId"
			},
			price: {
				type: DataTypes.NUMBER,
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				field: "createdAt"
			}
		},
		{
			modelName: "Property",
			paranoid: true,
			updatedAt: false,
			timestamps: false
		}
	);

	return Property;
};

export default Property;
