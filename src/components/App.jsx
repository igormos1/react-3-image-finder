

import React, {Component} from 'react';
import styles from './App.module.css';
import imagesApi from "./servises/images-api";
import Searchbar from './Searchbar';
import Loader from "./Loader";
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery:'',
    isLoading: false,
    error: null,
    showModal: false
}



  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
        this.fetchImages();
    }
  }

  onChangeQuery = (query) => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      isLoading: false,
      error: null,
      showModal: false
    })
  }

  largeImageURL = ''

  fetchImages = () => {
    const {currentPage, searchQuery} = this.state;
    const options = {currentPage, searchQuery};

    this.setState({isLoading: true});

    imagesApi(options)    
    .then(({hits}) =>{
      
      this.setState( prevState =>({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1
      }));
     
    })
    .catch(error => this.setState({error}))
    .finally(this.setState({isLoading: false}));
}

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = (searchId) => {
   const image = this.state.images.find(image => image.id === searchId);  
   this.largeImageURL = image.largeImageURL;
   this.toggleModal();
   
  }


  render() {
    const {images, isLoading, error, showModal} = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    
    return(
      <div className={styles.app}>
      {error && alert("Error")}
      <Searchbar onSubmit={this.onChangeQuery}/>
      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery openModal={this.openModal} images={images}/>}
      {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages}/>}
      {showModal && <Modal largeImg={this.largeImageURL} onClose={this.toggleModal}/>}
      </div>
    )
  }
};

export default App;