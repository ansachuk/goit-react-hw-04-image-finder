import { useEffect } from "react";
import PropTypes from "prop-types";

import css from "./Modal.module.css";

export default function Modal({ onESCPress, closeModal, currentModalImg: { largeImageURL, tags } }) {
	useEffect(() => {
		window.addEventListener("keydown", onESCPress);

		return () => {
			window.removeEventListener("keydown", onESCPress);
		};
	}, [onESCPress]);

	return (
		<div onClick={closeModal} className={css.Overlay}>
			<div className={css.Modal}>
				<img src={largeImageURL} alt={tags} />
			</div>
		</div>
	);
}

Modal.propTypes = {
	onESCPress: PropTypes.func.isRequired,
	currentModalImg: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired,
};
