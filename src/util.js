import React from 'react';
import axios from 'axios';

export const URL = 'https://nettipuoskari-production.herokuapp.com/';

export const getByKeyword = (keyword) => {
  return axios.get(generateUrl(keyword));
};

export const formatBucket = (bucket) => {
  let data = bucket
    .join(", ");

  return <p>{data}</p>;
};

export const generateUrl = (keyword) => {
  return URL + "search/" + keyword;
};

export const getQuotesByKeywords = (requestType, keyword1, keyword2, page=1) => {
  if ("keywordQuotes" === requestType) {
    return axios.get(`${URL}keyword_quotes/${keyword1}/page/${page}`);
  } else if ("dosageQuotes" === requestType) {
    return axios.get(`${URL}dosage_quotes/${keyword1}/${keyword2}/page/${page}`);
  } else {
    return axios.get(`${URL}related_quotes/${keyword1}/${keyword2}/page/${page}`);
  }
};

export const getBasketByKeyword = (keyword) => {
  return axios.get(`${URL}baskets/${keyword}`);
};