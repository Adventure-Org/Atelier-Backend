/* eslint-disable import/no-unresolved */
import http from 'k6/http';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 80,
  duration: '30s',
};
const url = 'http://localhost:8080/products';

export default () => {
  http.batch([
    ['GET', `${url}`],
    ['GET', `${url}/2`],
    ['GET', `${url}/2/styles`],
    ['GET', `${url}/2/related`],
  ]);
};
