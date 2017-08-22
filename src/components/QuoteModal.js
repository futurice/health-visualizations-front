import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { getQuotesByKeywords, getBasketByKeyword, isNumeric } from '../util';
import '../css/QuoteModal.css';
import Highlighter from 'react-highlight-words';
import Spinner from 'react-spinkit'
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';

export default class QuoteModal extends React.Component {

  constructor(props) {
    super(props);

    this.formatPosts = this.formatPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.currentResource = this.currentResource.bind(this);
    this.getQueryParams = this.getQueryParams.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      posts: [],
      page: 1,
      loading: false
    };
  }
  
  /*
    If ?posts=true then simply display all the posts with a certain keyword
    If ?quotes_with=<number> then display quotes with that dose
    If ?quotes_with=<drug / symptom> then display quotes with that drug 
  */
  currentResource() {
    const queryParams = queryString.parse(this.props.location.search);
        
    let quoteModalResource = "related_quotes";
    if (queryParams["posts"]) {
      quoteModalResource = "keyword_quotes";
    } else if (isNumeric(queryParams["quotes_with"])) {
      quoteModalResource = "dosage_quotes";
    } 

    return quoteModalResource;
  }

  getPosts() {
    this.setState({
      posts: [],
      loading: true
    });
        
    const [keyword1, keyword2, page] = this.getQueryParams();
    const quoteModalResource = this.currentResource();

    getQuotesByKeywords(quoteModalResource, keyword1, keyword2, page)
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

    this.setState({
      hilightWords: this.props.searchWords
    });

    if (quoteModalResource === 'related_quotes') {
      getBasketByKeyword(keyword2)
        .then((response) => {
          let keyword2Basket = response.data;
          this.setState({
            hilightWords: [...this.props.searchWords, ...keyword2Basket]
          });
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState(this.getInitialState(), this.getPosts);
    }
  }

  componentWillMount() {
    if (this.props.isOpen) {
      this.setState(this.getInitialState(), this.getPosts);
    }
  }

  heading() {
    const queryParams = queryString.parse(this.props.location.search);
    const [keyword1, keyword2] = this.getQueryParams();
    
    if (queryParams["posts"]) {
      return `Posts with ${keyword1}`;
    } else if (isNumeric(queryParams["quotes_with"])) {
      return `Posts with ${keyword1} ${keyword2} mg`;
    } else {
      return `Posts with ${keyword1} and ${keyword2}`;
    }
  }

  formatPosts(posts) {
    return posts.map((post, index) => {
      return (
        <div key={index} className="modal-section">

          <Highlighter
            searchWords={this.state.hilightWords || []}
            textToHighlight={post[1]}
            className="quote-modal-text"
            autoEscape={true}
          />
          <div className="link-container">
            <a href={post[0]} target="_blank" className="quote-modal-thread-link">
              Full thread
            </a>
          </div>
        </div>
      );
    });
  }

  getQueryParams() {
    const queryParams = queryString.parse(this.props.location.search);
    const keyword1 = this.props.match.params.keyword; // Base word comes from /search/:keyword
    const keyword2 = queryParams["quotes_with"]; // Comparison word comes from ?quotes_with=:keyword  
    const page = parseInt(queryParams["page"]);

    return [keyword1, keyword2, page];
  }

  handlePageClick(data) {
    let page = data.selected + 1;
    const [keyword1, keyword2] = this.getQueryParams();

    if (this.currentResource() !== "keyword_quotes") {
      this.props.history.push(`/search/${keyword1}?quotes_with=${keyword2}&page=${page}`)
    } else {
      this.props.history.push(`/search/${keyword1}?posts=true&page=${page}`)
    }
    this.getPosts();    
  }

  render() {
    return (
      <div className="quote-modal-wrapper">
        <Modal
          isOpen={this.props.isOpen}
          contentLabel="Modal"
          className="quote-modal"
          onRequestClose={() => {
            this.props.closeModal();
          }}
        >
          { this.state.loading &&
            <Spinner fadeIn="none" name="pulse" color='black' />
          }
          <div className="quote-modal-heading">
            <button className="close-button top-right" onClick={this.props.closeModal}>&times;</button>
            <h1 className="quote-modal-heading-text" >{this.heading()} </h1>
          </div>
          <div className="quote-modal-content">
            {this.formatPosts(this.state.posts)}
          </div>
          <div className={this.state.loading ? "quote-modal-footer-hidden" : "quote-modal-footer"}>
            <ReactPaginate
              containerClassName={"pagination"}
              previousLabel={"previous"}
              previousClassName={"pagination-prev-next"}
              nextClassName={"pagination-prev-next"}
              pageLinkClassName={"pagination-page-link"}
              activeClassName={"pagination-active"}
              nextLabel={"next"}
              breakLabel={<p>...</p>}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              subContainerClassName={"pages pagination"}
              forcePage={parseInt(queryString.parse(this.props.location.search)["page"]) - 1}
            />
          </div>


        </Modal>
      </div>
    );
  }
}