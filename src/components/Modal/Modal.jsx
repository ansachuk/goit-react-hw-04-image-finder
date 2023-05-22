import { useEffect } from "react";
import PropTypes from "prop-types";

import css from "./Modal.module.css";

export default function Modal({ closeModalOnESCPress, closeModal, currentModalImg: { largeImageURL, tags } }) {
	useEffect(() => {
		window.addEventListener("keydown", closeModalOnESCPress);

		return () => {
			window.removeEventListener("keydown", closeModalOnESCPress);
		};
	}, [closeModalOnESCPress]);

	return (
		<div onClick={closeModal} className={css.Overlay}>
			<div className={css.Modal}>
				<img src={largeImageURL} alt={tags} />
			</div>
		</div>
	);
}

Modal.propTypes = {
	closeModalOnESCPress: PropTypes.func.isRequired,
	currentModalImg: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired,
};
