import axios, { AxiosPromise, Method } from 'axios';
import { API_VERSION } from '../App.config.json';

class Request {
  private api = `/api/${API_VERSION}`;

  get apiUrl(): string {
    return this.api;
  }

  send(
    url: string,
    method: Method,
    data: null | Record<string, any> = null,
    withCredentials = false,
    headers?: Record<string, any>
  ): AxiosPromise {
    return axios(`${this.apiUrl}${url}`, {
      method,
      data,
      headers,
      withCredentials,
    });
  }
}

export default Request;