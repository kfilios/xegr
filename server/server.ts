import express, { Request, Response } from "express";
import https from "https";
import bodyParser from "body-parser";
import cors from "cors";
import NodeCache from "node-cache";

import Property from "./models/Property.model";
import { sequelize } from "./config";

const app = express();
const PORT = process.env.PORT || 3030;
// Create cache with 1 hour expiration time
const cache = new NodeCache({ stdTTL: 3600 });

app.use(bodyParser.json());
app.use(cors());

const PropertyModel = Property(sequelize);

// Define a route to fetch data from the external API
app.get("/fetchData", async (req: Request, res: Response) => {
	try {
		const input = req.query.input as string;

		// Check if the data is already in the cache
		const cachedData = cache.get(input);

		if (cachedData) {
			setTimeout(() => {
				res.json(cachedData);
			}, 250);
			return;
		}

		// If not in the cache, fetch data from the external API using the https module
		const apiUrl = `https://4ulq3vb3dogn4fatjw3uq7kqby0dweob.lambda-url.eu-central-1.on.aws/?input=${input}`;

		https.get(apiUrl, response => {
			let data = "";

			response.on("data", chunk => {
				data += chunk;
			});

			response.on("end", () => {
				const responseData = JSON.parse(data);

				// Store the data in the cache
				cache.set(input, responseData);

				setTimeout(() => {
					res.json(responseData);
				}, 250);
			});
		});
	} catch (error) {
		console.error("Could not fetch from API:", error);
		res.status(500).json({ error: "Could not fetch from API" });
	}
});

// Create a new property
app.post("/create", async (req: Request, res: Response) => {
	try {
		const formData = req.body;

		const isTitleValid = formData?.title?.length <= 155;
		if (!isTitleValid) return res.status(400).json({ message: "Title is too long." });
		const isPriceValid = !isNaN(formData?.price);
		if (!isPriceValid) return res.status(400).json({ message: "Price must be a number." });
		const isAreaValid = formData?.placeId;
		if (!isAreaValid) return res.status(400).json({ message: "Please select an area from the list." });

		const isDonation = `${formData?.type}` === "4";
		const isValidProperty =
			formData?.title && formData?.type > 0 && formData?.area && (formData?.price || isDonation);
		if (isValidProperty) {
			// const property = await PropertyModel.findOne({ where: { title: formData?.title } });
			// if (property) return res.status(400).json({ message: "Property already exists." });
		} else {
			return res.status(400).json({ message: "Please fill in all fields." });
		}

		// Create a new property record in the database
		const { title, type, area, price, description, placeId } = formData;
		const newProperty = await PropertyModel.create({ title, type, area, price, description, placeId });

		// Send the newly created property as a response
		setTimeout(() => {
			return res.status(201).json(newProperty);
		}, 1000);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Failed to create a new property." });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
