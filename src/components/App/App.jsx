import { useState, useEffect } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import fetchPhotos from "services/fetchPhotos";

export default function App() {
	const [images, setImages] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [currentModalImg, setCurrentModalImg] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentModalImg({});
	};

	const closeModalOnESCPress = e => {
		if (e.code === "Escape") {
			return closeModal();
		}
	};

	const closeModalOnClick = e => {
		const { currentTarget, target } = e;

		if (currentTarget === target) {
			return closeModal();
		}
	};

	const onImgClick = e => {
		const currentImg = images.find(image => image.id === Number(e.target.id));
		setCurrentModalImg(currentImg);
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		if (!searchQuery) {
			return;
		}

		async function fetchSearchQuery() {
			setShowLoader(true);

			const searchPhotos = await fetchPhotos(searchQuery, currentPage);
			if (currentPage === 1) {
				setImages([...searchPhotos]);
			} else {
				setImages(prev => [...prev, ...searchPhotos]);
			}

			setShowLoader(false);
		}

		fetchSearchQuery();
	}, [currentPage, searchQuery]);

	return (
		<>
			<Searchbar setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage}></Searchbar>

			{images.length > 0 && (
				<ImageGallery>
					{images.map(({ tags, webformatURL, id }) => (
						<ImageGalleryItem onClick={onImgClick} key={id} id={id} webURL={webformatURL} tags={tags} />
					))}
				</ImageGallery>
			)}

			<Loader visible={showLoader} />

			{searchQuery && images.length > 0 && <Button setCurrentPage={setCurrentPage} />}

			{isModalOpen && (
				<Modal
					closeModalOnESCPress={closeModalOnESCPress}
					closeModal={closeModalOnClick}
					currentModalImg={currentModalImg}
				/>
			)}
		</>
	);
}
