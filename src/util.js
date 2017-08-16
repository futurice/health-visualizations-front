import React from 'react';
import axios from 'axios';

export const URL = 'https://be.nettipuoskari.fi/';

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

export const getMostCommon = (resource) => {
  return axios.get(`${URL}most_common/${resource}`);
}

export const getBasketByKeyword = (keyword) => {
  return axios.get(`${URL}baskets/${keyword}`);
};

export const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}