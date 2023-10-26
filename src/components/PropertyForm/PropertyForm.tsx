import { useState, SyntheticEvent } from "react";

import "./styles.css";

function PropertyForm() {
	const [formData, setFormData] = useState({
		title: "",
		type: -1,
		area: "",
		price: "",
		description: ""
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		// Send data to the server for storage
		try {
			const response = await fetch("http://localhost:3030/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				console.log("Property created successfully");
				setFormData({ title: "", type: -1, area: "", price: "", description: "" });
			} else {
				console.error("Failed to create property");
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<div className="my-form">
			<h2>My Form</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title"
						value={formData.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="type">Type:</label>
					<select id="type" name="type" value={formData.type} onChange={handleInputChange}>
						<option value="-1">Select type</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="title">Area:</label>
					<input
						type="text"
						id="area"
						name="area"
						placeholder="Type in the property's area"
						value={formData.area}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">Price in Euros:</label>
					<input
						type="text"
						id="price"
						name="price"
						placeholder="Amount"
						value={formData.price}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Extra description:</label>
					<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleInputChange}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default PropertyForm;
