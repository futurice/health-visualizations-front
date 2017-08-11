import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { getQuotesByKeywords, getBasketByKeyword } from '../util';
import '../css/QuoteModal.css';
import Highlighter from 'react-highlight-words';
import Spinner from 'react-spinkit'

export default class QuoteModal extends React.Component {

  constructor(props) {
    super(props);

    this.formatPosts = this.formatPosts.bind(this);
    this.createPageLinks = this.createPageLinks.bind(this);
    this.jumpToPage = this.jumpToPage.bind(this);
    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: [],
      page: 1,
      loading: false
    }
  }

  getPosts() {
    this.setState({
      posts: [],
      loading: true
    });

    const keyword1 = this.props.keyword1;
    const keyword2 = this.props.keyword2;
    const page = this.state.page;

    if (!keyword1 || !keyword2) {
      return;
    }

    getQuotesByKeywords(keyword1, keyword2, page)
      .then((response) => {
        this.setState({
          posts: response.data.posts,
          pageCount: response.data.page_count,
          loading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });

    getBasketByKeyword(keyword2)
      .then((response) => {
        let keyword2Basket = response.data;

        let hilightWords = [...this.props.searchWords, ...keyword2Basket];
        this.setState({
          hilightWords
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  componentWillReceiveProps() {
    this.setState({
      posts: [],
      loading: false
    }, this.getPosts);
  }

  formatPosts(posts) {
    return posts.map((post, index) => {
      return (
        <div key={index} className="modal-section">
          <Highlighter
            searchWords={this.state.hilightWords || []}
            textToHighlight={post}
            className="quote-modal-text"
          />
        </div>
      );
    });
  }

  jumpToPage(i) {
    this.setState({
      page: i
    }, this.getPosts);
  }

  createPageLinks() {
    if (!this.state.pageCount || this.state.loading) {
      return;
    }
    return (
      <div>
        {Array(this.state.pageCount).fill().map((_, i) => {
          return (
            <span key={`page-link-${i}`} onClick={() => this.jumpToPage(i)}>
              {i}
            </span>
          )
        })
        }
      </div>
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
        <div className="quote-modal-heading">
          <button className="close-button top-right" onClick={this.props.closeModal}>&times;</button>
          <h1 className="modal-heading-header" >{this.props.heading} </h1>
        </div>
        <div className="quote-modal-content">
          { this.state.loading &&
            <Spinner fadeIn="none" name="pulse" color='black' />
          }
          {this.formatPosts(this.state.posts)}
          <div className="quote-modal-page-links">
            {this.createPageLinks()}
          </div>
        </div>

      </Modal>
    );
  }
}