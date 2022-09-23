import axios, { AxiosError } from 'axios';

import findCookie from './findCookie';
import getApp from './getApp';
import { oops, setErrors } from '../store/errors';
import { showErrors } from '../store/UX';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'XSRF-Token': findCookie('XSRF-TOKEN')
});

export default {
  async get (url, { params } = { params: {} }) {
    return await this.errorHandler(async () => {
      return await axios.get(`${getApp()}${url}`, {
        params,
        withCredentials: true
      });
    });
  },
  async post (url, { params, body }) {
    return await this.errorHandler(async () => {
      return await axios.post(`${getApp()}${url}`, body, {
        params,
        headers: getHeaders(),
        withCredentials: true
      });
    });
  },
  async patch (url, { params, body }) {
    return await this.errorHandler(async () => {
      return await axios.patch(`${getApp()}${url}`, body, {
        params,
        headers: getHeaders(),
        withCredentials: true
      });
    });
  },
  async delete (url) {
    return await this.errorHandler(async () => {
      return await axios.delete(`${getApp()}${url}`, {
        headers: getHeaders(),
        withCredentials: true
      });
    });
  },
  async restoreCSRF () {
    if (process.env.NODE_ENV === 'development') {
      await this.errorHandler(async () => {
        await axios.get('http://localhost:5000/api/csrf/restore', {
          withCredentials: true
        });
      });
    }
  },
  captureDispatch (dispatch) {
    this.dispatch = dispatch;
  },
  async errorHandler (asyncFetchFn) {
    try {
      return await asyncFetchFn();
    } catch (err) {
      if (
        !(err instanceof AxiosError) ||
        !(err.response.data) ||
        (!err.response.data.errors)
      ) {
        this.dispatch(oops());
      } else {
        this.dispatch(setErrors([
          ...err.response.data.errors,
          'If you believe you\'re seeing this message in error, please refresh the page and try again'
        ]));
        this.dispatch(showErrors());
      }
    }
  }
};
