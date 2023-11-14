/*
  Filename: complex_web_scraping.js
  Content: Complex web scraping script to extract data from a website
*/

const axios = require('axios');
const cheerio = require('cheerio');
const { promises: fs } = require('fs');

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract data from the website
    const data = [];
    $('.product').each((index, element) => {
      const productName = $(element).find('.product-name').text().trim();
      const productPrice = $(element).find('.product-price').text().trim();

      data.push({ name: productName, price: productPrice });
    });

    // Save data to a file
    await fs.writeFile('products.json', JSON.stringify(data, null, 2));
    console.log('Data extracted successfully and saved to products.json');
  } catch (error) {
    console.error('Error occurred while scraping the website:', error);
  }
}

const websiteUrl = 'https://www.example.com/products';
scrapeWebsite(websiteUrl);
