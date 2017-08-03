import React from 'react';
import axios from 'axios';

export const URL = 'https://citizen-medscapes-staging.herokuapp.com/'

export const getByKeyword = (keyword) => {
  return axios.get(generateUrl(keyword));
}

export const formatBucket = (bucket) => {
  let data = bucket
    .sort()
    .map((e) => <p key={e}> {e} </p>);

  return data;
}

export const generateUrl = (keyword) => {
  return URL + "search/" + keyword;
}