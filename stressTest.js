/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // recovery
  ],
};

const url = 'http://localhost:8080/products/';

export default () => {
  http.batch([
    ['GET', `${url}`],
    ['GET', `${url}/2`],
    ['GET', `${url}/2/styles`],
    ['GET', `${url}/2/related`],
  ]);

  sleep(1);
};
