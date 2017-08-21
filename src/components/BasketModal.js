import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import '../css/BasketModal.css';
import { formatBucket } from '../util';

export default class BasketModal extends React.Component {

  componentWillMount() {
    this.setState({
      data: formatBucket(this.props.data)
    });   
  }

  render() { 
    return (
      <div className="basket-modal-wrapper">
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Modal"
        className="basket-modal"
        onRequestClose={() => {
          this.props.closeModal();
        }}
      >
      <div className="basket-modal-heading">
        <h1 className="basket-modal-heading-text" >{this.props.heading} </h1>
        <button className="close-button" onClick={this.props.closeModal}>&times;</button>
      </div>
      <div className="basket-modal-content">
        { this.state.data }
      </div>   
      </Modal>
      </div>
    );
  }
}