import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { getQuotesByKeywords } from '../util';
import '../css/QuoteModal.css';

export default class QuoteModal extends React.Component {

  constructor(props) {
    super(props);

    this.formatPosts = this.formatPosts.bind(this);

    this.state = {}
  }

  componentWillReceiveProps() {
    const keyword1 = this.props.keyword1;
    const keyword2 = this.props.keyword2;

    if (!keyword1 || !keyword2) {
      return;
    }

    getQuotesByKeywords(keyword1, keyword2, this.props.page)
      .then((response) => {
        console.log(response);
        this.setState({
          posts: this.formatPosts(response.data)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formatPosts(posts) {
    return (
      posts.map((post) => {
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
          this.props.closeModal;
        }}
      >
        <div className="modal-heading">
          <h1 className="modal-heading-header" >{this.props.heading} </h1>
          <button className="close-button top-right" onClick={this.props.closeModal}>&times;</button>
        </div>
        <div className="modal-content">
          { this.state.data }
        </div>
      </Modal>
    );
  }
}