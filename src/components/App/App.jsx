import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    articles: [],
    input: '',
    page: 1,
    perPage: 3, //12 by hometask
    isLoading: false,
    largeImageURL: null,
    toggleModal: false,
  };
  toggleModal = () =>
    this.setState(prevState => ({ toggleModal: !prevState.toggleModal }));
  setLargeImageURL = image => this.setState({ largeImageURL: image });
  clearLargeImageURL = () => this.setState({ largeImageURL: null });
  httpRequest = async () => {
    try {
      this.setState(prevState => ({
        perPage: prevState.perPage + 3,
        isLoading: true,
      }));
      const response = await axios.get(`?q=${this.state.input}`, {
        params: {
          key: '29101880-694af7e9974b3c9bb9fbf3052',
          image_typemit: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: this.state.perPage,
          page: this.state.page,
        },
      });
      this.setState({
        articles: response.data.hits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    prevState.input !== this.state.input && // except cycling
      this.httpRequest(); // search btn
  }
  onSubmit = ({ input, perPage }) => this.setState({ input, perPage });

  render() {
    const { articles, isLoading } = this.state;
    return (
      <>
        {this.state.toggleModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.largeImageURL} alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              cum aperiam inventore mollitia autem, non consequuntur, magnam
              delectus commodi quibusdam atque recusandae repellendus illum
              eveniet debitis, ea illo numquam mole
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            articles={articles}
            toggleModal={this.toggleModal}
            setLargeImageURL={this.setLargeImageURL}
            clearLargeImageURL={this.clearLargeImageURL}
          />
        )}
        {this.state.articles.length > 0 && (
          <Button httpRequest={this.httpRequest} />
        )}
      </>
    );
  }
}
