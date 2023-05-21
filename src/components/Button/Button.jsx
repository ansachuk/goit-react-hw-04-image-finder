import PropTypes from "prop-types";

import css from "./Button.module.css";
import fetchPhotos from "../../services/fetchPhotos";

export default function Button({ onFetch, query, page, setShowLoader }) {
	const onButtonClick = async () => {
		setShowLoader(true);
		const images = await fetchPhotos(query, page + 1);

		onFetch(images);
		setShowLoader(false);
	};

	return (
		<button onClick={onButtonClick} className={css.Button}>
			Load More
		</button>
	);
}

Button.propTypes = {
	onFetch: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	setShowLoader: PropTypes.func.isRequired,
};
