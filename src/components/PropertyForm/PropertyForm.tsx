import { useState, SyntheticEvent } from "react";

import { ErrorData, FormData } from "types";
import { emptyErrorData, emptyFormData } from "constants/form";
import { AreaField } from "components";
import "./styles.css";

const isTitleValid = (title: any) => {
	return title.length <= 155;
};

const isPriceValid = (price: any) => {
	return !isNaN(price);
};

const validate: { [key: string]: (value: any) => boolean } = {
	title: isTitleValid,
	price: isPriceValid
};

function PropertyForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>(emptyFormData);
	const [errorData, setErrorData] = useState<ErrorData>(emptyErrorData);

	const isDonation = `${formData.type}` === "4";
	const hasFormErrors = errorData.title || errorData.price;
	const validProperty =
		formData.title && formData.type > 0 && formData.area && (formData.price || isDonation) && !hasFormErrors;
	const validPlaceId = placeId;

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
				body: JSON.stringify({ ...formData, placeId, price: isDonation ? 0 : formData.price })
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

		// Validate input
		if (validate?.[name] && !validate?.[name](value)) {
			setErrorData({ ...errorData, [name]: true });
		} else {
			setErrorData({ ...errorData, [name]: false });
		}

		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="my-form">
			<h2>New Property</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input
						className={`${errorData?.title ? "errorInput" : ""}`}
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
						<option value="0">Select type</option>
						<option value="1">Rent</option>
						<option value="2">Buy</option>
						<option value="3">Exchange</option>
						<option value="4">Donation</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="title">Area:</label>
					<AreaField
						formData={formData}
						setFormData={setFormData}
						setLoading={setLoading}
						setError={setError}
						setPlaceId={setPlaceId}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">Price in Euros:</label>
					<input
						type="text"
						id="price"
						name="price"
						placeholder="Amount"
						className={`${errorData?.price ? "errorInput" : ""}`}
						value={isDonation ? 0 : formData.price}
						onChange={handleInputChange}
						disabled={isDonation}
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
				<button type="submit" disabled={!!(loading || error || !validProperty)}>
					{loading && "Loading.."}
					{!loading && validProperty && validPlaceId && "Submit"}
					{!loading && !validProperty && !hasFormErrors && "Please fill in all fields"}
					{!loading &&
						validProperty &&
						!validPlaceId &&
						!hasFormErrors &&
						"Please select an area from the list"}
					{!loading && hasFormErrors && "Please correct the errors"}
				</button>
			</form>
		</div>
	);
}

export default PropertyForm;
