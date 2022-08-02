import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 200,
  duration: '10s',
};

export default () => {
  http.get('http://localhost:3001/reviews?product_id=40345');
  http.get('http://localhost:3001/reviews/meta?product_id=40345');
  http.put('http://localhost:3001/reviews/232062/helpful');
};
