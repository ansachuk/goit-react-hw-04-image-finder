import PropTypes from "prop-types";

import css from "./Button.module.css";

export default function Button({ setCurrentPage }) {
	const onButtonClick = () => {
		setCurrentPage(prev => prev + 1);
	};

	return (
		<button onClick={onButtonClick} className={css.Button}>
			Load More
		</button>
	);
}

Button.propTypes = {
	setCurrentPage: PropTypes.func.isRequired,
};
