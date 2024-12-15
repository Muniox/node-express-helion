import portfinder from 'portfinder';
import puppeteer from 'puppeteer';
import app from '../meadowlark';
import { beforeEach } from "@jest/globals";
import { Server } from "http"; // Import typu Server z modułu http

let server: Server;
let port: number;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port)
})

afterEach(() => {
  server.close()
})

test('strona domowa umożliwia przejście do strony O nas', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]')
  ])
  expect(page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
})
