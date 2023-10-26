import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Property from "./models/property.model";
import { sequelize } from "./config";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// const router = express.Router();

const PropertyModel = Property(sequelize);

// Create a new property
app.post("/create", async (req: Request, res: Response) => {
	try {
		// Get the property data from the request body
		const { title, description, area } = req.body;

		// Create a new property record in the database
		const newProperty = await PropertyModel.create({
			title,
			description,
			area
		});

		return res.status(201).json(newProperty); // Send the newly created property as a response
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Failed to create a new property." });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});