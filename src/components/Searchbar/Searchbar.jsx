import { useState } from "react";
import PropTypes from "prop-types";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { ReactComponent as SearchIcon } from "../../icons/searc.svg";
import fetchPhotos from "../../services/fetchPhotos";
import css from "./Searchbar.module.css";

export default function Searchbar({ setShowLoader, onFetchPhotos }) {
	const [query, setQuery] = useState("");

	const onInputChange = e => {
		setQuery(e.currentTarget.value);
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (query.trim() !== "") {
			setShowLoader(true);
			const images = await fetchPhotos(query);

			onFetchPhotos(images, query);

			setShowLoader(false);

			setQuery("");
		} else {
			Notify.warning("Please, enter a query!");

			setQuery("");
		}
	};

	return (
		<header className={css.searchbar}>
			<form className={css.form} onSubmit={onSubmit}>
				<button type="submit" className={css.button}>
					<span className={css.label}></span>

					<SearchIcon />
				</button>

				<input
					onChange={onInputChange}
					value={query}
					className={css.input}
					name="query"
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
				/>
			</form>
		</header>
	);
}

Searchbar.propTypes = {
	setShowLoader: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};
