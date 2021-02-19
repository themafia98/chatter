import axios, { AxiosPromise, Method } from 'axios';
import { API_VERSION } from '../App.config.json';

class Request {
  private api = `/api/${API_VERSION}`;

  get apiUrl(): string {
    return this.api;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  send(
    url: string,
    method: Method,
    data: null | Record<string, any> = null,
    withCredentials = false,
    headers: Record<string, any> | null = null
  ): AxiosPromise {
    const apiHeaders = {
      ...headers,
    };

    if (withCredentials) {
      apiHeaders.Authorization = `bearer ${this.getToken()}`;
    }

    return axios(`${this.apiUrl}${url}`, {
      method,
      data,
      headers: apiHeaders,
      withCredentials,
    });
  }
}

export default Request;