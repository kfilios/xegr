import { useState, SyntheticEvent } from "react";

import { FormData } from "types";
import { emptyFormData } from "constants/form";
import { AreaField } from "components";
import "./styles.css";

function PropertyForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>(emptyFormData);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setFormData(emptyFormData);
		setLoading(true);
		// Send data to the server for storage
		try {
			const response = await fetch("http://localhost:3030/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});
			setLoading(false);

			if (response.ok) {
				const responseData = await response.json();
				setFormData(responseData);
			} else {
				setError("Failed to create property");
				console.error("Failed to create property");
			}
		} catch (error) {
			setError("Network error");
			console.error("Network error:", error);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="my-form">
			<h2>New Property</h2>
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
					<AreaField
						formData={formData}
						setFormData={setFormData}
						setLoading={setLoading}
						setError={setError}
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
				{error && <div className="error">Error: {error}</div>}
				<button type="submit" disabled={!!(loading || error)}>
					{loading && "Loading.."}
					{!loading && "Submit"}
				</button>
			</form>
		</div>
	);
}

export default PropertyForm;
