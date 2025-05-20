This is a simple project that scrapes all products from a fake API, even though the API limits each request to max 1000 products. The goal is to get everything by splitting the requests into smaller price ranges.

I got the idea from the Apify Academy docs on crawling with search filters `https://docs.apify.com/academy/advanced-web-scraping/crawling/crawling-with-search#implementing-a-range-filter`, but instead of using Apify’s crawler setup, I rewrote it in plain JavaScript with Axios. It uses a basic queue system to keep track of the price ranges and recursively splits them when a request hits the 1000 product limit.

1. Install the dependencies

```bash
  npm install
```

2. Run the API

```bash
  npm run api
```

3. Run the script

```bash
  npm run dev
```
