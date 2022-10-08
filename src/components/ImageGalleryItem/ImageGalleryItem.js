import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cssItem from './ImageGalleryItem.module.css';
export class ImageGalleryItem extends Component {
  onGalleryItem = (event, largeImageURL) => {
    event.target && this.props.setLargeImageURL(largeImageURL);
    this.props.toggleModal();
  };
  render() {
    const { articles } = this.props;
    return (
      <>
        {articles.length > 0 &&
          articles.map(({ id, tags, webformatURL, largeImageURL }) => {
            return (
              <li
                key={id.toString()}
                className={cssItem.ImageGalleryItem}
                onClick={event => this.onGalleryItem(event, largeImageURL)}
              >
                <img
                  src={webformatURL}
                  alt={tags}
                  className={cssItem['ImageGalleryItem-image']}
                />
              </li>
            );
          })}
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
  setLargeImageURL: PropTypes.func.isRequired,
};
