import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { getQuotesByKeywords } from '../util';
import '../css/QuoteModal.css';

export default class QuoteModal extends React.Component {

  constructor(props) {
    super(props);

    this.formatPosts = this.formatPosts.bind(this);

    this.state = {
      posts: []
    }
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
          posts: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formatPosts(posts) {
    return posts.map((post, index) => {
      return (
        <div key={index} className="modal-section">
          <p key={"p"-index}> { post } </p>
        </div>
      );  
    }); 
  }  

  render() {

    console.log(this.state.posts)
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
          { this.formatPosts(this.state.posts) }
        </div>
      </Modal>
    );
  }
}