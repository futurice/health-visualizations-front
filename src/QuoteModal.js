import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

export default class QuoteModal extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Modal"
      >
        <h1>{this.props.resourceName} <button className="closeButton" onClick={this.props.closeModal}>close</button></h1>
       

        <p>{this.props.data}</p>   
      </Modal>      
    );
  }
}