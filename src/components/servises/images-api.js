import axios from 'axios';
import propTypes from 'prop-types';

const key = '25783532-c25c49afce5183be9881181c4';

const fetchImages = ({searchQuery='', currentPage=1, pageSize=12})=>{
    return axios
        .get(
            `https://pixabay.com/api/?q=${searchQuery}&key=${key}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
            )
        .then(response => response.data);
}

fetchImages.propTypes = {
    searchQuery: propTypes.string.isRequired,
    currentPage: propTypes.number,
    pageSize: propTypes.number       
  }

export default fetchImages;