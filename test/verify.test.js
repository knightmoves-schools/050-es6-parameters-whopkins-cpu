const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should create a function named calculateTotal that takes two parameters subtotal and shipping and returns the sum of both values', async function() {
      const result = await page.evaluate(() => {
        return calculateTotal(1.25, 2.25);
      });

      expect(result).toBe(3.50);
    });

    it('should set a default value for shipping to 2.50', async function () {
        const result = await page.evaluate(() => {
          return calculateTotal(1.50);
        });

        expect(result).toBe(4.00);
    });

    it('should create a function named printTopThreeHeadlines that takes a rest parameter list of string headlines named headlines and returns the top three headlines with a new line between each headline', async function () {
        const result = await page.evaluate(() => {
          return printTopThreeHeadlines('first headline', 'second headline', 'third headline');
        });

        expect(result.trim()).toBe(`first headline\nsecond headline\nthird headline`)
    });
});

