import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { ThreeDots } from 'react-loader-spinner';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    articles: [],
    input: '',
    page: 1,
    perPage: 3, //12 by hometask
    isLoading: false,
  };
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
  handleSubmit = event => {
    event.preventDefault();
    this.state.input !== event.currentTarget.elements.input.value &&
      this.setState({
        input: event.currentTarget.elements.input.value,
        perPage: 3,
      });
    // event.currentTarget.elements.input.value = '';
  };

  render() {
    const { articles, isLoading } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="red"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
            }}
            wrapperClassName=""
            visible={true}
          />
        )}
        <ImageGallery articles={articles} />
        {this.state.articles.length > 0 && (
          <Button httpRequest={this.httpRequest} />
        )}
      </>
    );
  }
}