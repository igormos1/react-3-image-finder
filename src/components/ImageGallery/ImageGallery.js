import styles from './ImageGallery.module.css';
import propTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';


const ImageGallery = ({images, openModal}) => {
    
    return(
        <ul className={styles.gallery}>
            {images.map( (image) => <ImageGalleryItem 
                                        key={image.id} 
                                        openModal={openModal}
                                        id={image.id} 
                                        smallImg={image.webformatURL}
                                        />)}
        </ul>
    )
}

ImageGallery.propTypes = {
    openModal: propTypes.func.isRequired,
    images: propTypes.arrayOf(propTypes.object).isRequired       
  }

export default ImageGallery;