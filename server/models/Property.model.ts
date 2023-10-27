import { Model, DataTypes, Sequelize } from "sequelize";

interface PropertyAttributes {
	title: string;
	type: number;
	area: string;
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
			title: DataTypes.STRING,
			type: DataTypes.NUMBER,
			area: DataTypes.STRING,
			price: DataTypes.NUMBER,
			description: DataTypes.TEXT,
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
