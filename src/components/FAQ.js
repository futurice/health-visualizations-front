import React, { Component } from 'react';
import '../css/Search.css';
import ChartSideBar from './ChartSideBar';
import DosageChart from './DosageChart';
import SearchBox from './SearchBox';
import { getByKeyword } from '../util';
import BasketModal from './BasketModal';
import QuoteModal from './QuoteModal';
import AssociatedChart from './charts/AssociatedChart';
import Spinner from 'react-spinkit'
import WarningText from './WarningText';
import queryString from 'query-string';
import postsSmallIcon from '../css/posts-small.svg';

export default class FAQ extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  render() {
    if (false && this.state.loading) {
      return <Spinner fadeIn="none" name="pulse" color='white' />;
    }

    console.log('hei')
    return (

      <div>FAQ</div>
    );
  }
}