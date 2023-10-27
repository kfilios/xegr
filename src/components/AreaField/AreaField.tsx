import { useState } from "react";
import Autosuggest from "react-autosuggest";

import { FormData } from "types";
import "./styles.css";

interface Props {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AreaField = ({ formData, setFormData, setLoading, setError }: Props) => {
	const [suggestions, setSuggestions] = useState([]);
	const [highlightedSection, setHighlightedSection] = useState("");

	const fetchSuggestions = () => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(`http://localhost:3030/fetchData?input=${formData?.area}`);
				if (!response.ok) throw new Error("Network response was not ok");

				const responseData = await response.json();

				setSuggestions(responseData);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	};

	const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		if (value.length >= 3) fetchSuggestions();
	};

	const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const onSuggestionChange = (_e: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
		setFormData({ ...formData, area: newValue });
	};

	const onSuggestionSelected = (
		e: React.FormEvent<HTMLElement>,
		{ suggestionValue }: { suggestionValue: string }
	) => {
		setFormData({ ...formData, area: suggestionValue });
	};

	const onSuggestionHighlighted = ({ suggestion }: { suggestion: { mainText: string } }) => {
		const { mainText } = suggestion ?? {};
		setHighlightedSection(mainText);
	};

	const renderSuggestion = (
		suggestion: { mainText: string },
		{ isHighlighted }: { isHighlighted: boolean }
	) => (
		<div
			className={`suggestion ${
				isHighlighted || highlightedSection === suggestion.mainText ? "highlighted" : ""
			}`}
		>
			{suggestion.mainText}
		</div>
	);

	const theme = {
		container: "autosuggest-container",
		suggestionsContainer: "suggestions-container",
		suggestionsList: "suggestions-list",
		suggestion: "suggestion"
	};
	return (
		<Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			onSuggestionsClearRequested={onSuggestionsClearRequested}
			onSuggestionHighlighted={onSuggestionHighlighted}
			onSuggestionSelected={onSuggestionSelected}
			getSuggestionValue={(suggestion: { mainText: string }) => suggestion.mainText}
			renderSuggestion={renderSuggestion}
			inputProps={{
				name: "area",
				placeholder: "Type in the property's area",
				value: formData.area,
				onChange: onSuggestionChange
			}}
			theme={theme}
		/>
	);
};

export default AreaField;
