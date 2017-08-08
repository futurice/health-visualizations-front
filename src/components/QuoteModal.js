import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { getQuotesByKeywords } from '../util';


export default class QuoteModal extends React.Component {

  constructor(props) {
    super(props);

    this.formatPosts = this.formatPosts.bind(this);
  }

  componentWillMount() {
    getQuotesByKeywords(this.props.keyword1, this.props.keyword2, this.props.page)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formatPosts() {
    return (
      this.state.posts.map((post) => {
        <div className="modal-section"> { post } </div>    
      }) 
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Modal"
        className="quote-modal"
        onRequestClose={() => {
          this.props.closeModal();
        }}
      >
        <div className="modal-heading">
          <h1 className="modal-heading-header" >{this.props.heading} </h1>
          <button className="close-button top-right" onClick={this.props.closeModal}>&times;</button>
        </div>
        <div className="modal-content">
          { this.state.posts }
        </div>
      </Modal>
    );
  }
}