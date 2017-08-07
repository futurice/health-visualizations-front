import React from 'react';
import axios from 'axios';

export const URL = "http://localhost:5000/";// 'https://citizen-medscapes-staging.herokuapp.com/';

export const getByKeyword = (keyword) => {
  return axios.get(generateUrl(keyword));
}

export const formatBucket = (bucket) => {
  let data = bucket
    .join(", ");

  return <p>{data}</p>;
}

export const generateUrl = (keyword) => {
  return URL + "search/" + keyword;
}