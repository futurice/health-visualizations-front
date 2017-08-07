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
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Modal"
        className="basket-modal"
        onRequestClose={() => {
          this.props.closeModal();
        }}
      >
      <div className="modal-heading">
        <h1 className="modal-heading-header" >{this.props.heading} </h1>
        <button className="close-button top-right" onClick={this.props.closeModal}>&times;</button>
      </div>
      <div className="modal-text">
        { this.state.data }
      </div>   
      </Modal>      
    );
  }
}