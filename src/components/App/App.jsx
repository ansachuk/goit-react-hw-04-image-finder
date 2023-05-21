import { useState } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import makeSmoothScroll from "../../services/smoothScroll";

export default function App() {
	const [images, setImages] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [currentModalImg, setCurrentModalImg] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const closeModalReset = () => {
		setIsModalOpen(false);
		setCurrentModalImg({});
	};

	const onESCPress = e => {
		if (e.code === "Escape") {
			return closeModalReset();
		}
	};

	const closeModal = e => {
		const { currentTarget, target } = e;

		if (currentTarget === target) {
			return closeModalReset();
		}
	};

	const onFetchPhotos = (photos, query) => {
		setTimeout(() => {
			makeSmoothScroll();
		}, 200);

		setImages([...photos]);
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const onImgClick = e => {
		const currentImg = images.find(image => image.id === Number(e.target.id));
		setCurrentModalImg(currentImg);
		setIsModalOpen(!isModalOpen);
	};

	const onLoadMoreClick = photos => {
		setImages(prev => [...prev, ...photos]);
		setCurrentPage(prev => prev + 1);
	};

	return (
		<>
			<Searchbar onFetchPhotos={onFetchPhotos} setShowLoader={setShowLoader}></Searchbar>

			<ImageGallery>
				{images.map(({ tags, webformatURL, id }) => (
					<ImageGalleryItem onClick={onImgClick} key={id} id={id} webURL={webformatURL} tags={tags} />
				))}
			</ImageGallery>

			<Loader visible={showLoader} />

			{searchQuery && (
				<Button setShowLoader={setShowLoader} onFetch={onLoadMoreClick} query={searchQuery} page={currentPage} />
			)}

			{isModalOpen && <Modal onESCPress={onESCPress} closeModal={closeModal} currentModalImg={currentModalImg} />}
		</>
	);
}
