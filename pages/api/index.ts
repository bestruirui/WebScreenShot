import { launch, Page } from "puppeteer-core";
import chrome from "chrome-aws-lambda";
let _page: Page | null;

async function getPage() {
    if (_page) return _page;
    const options = { 
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    };
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(url, width, height) {
    const page = await getPage();
    await page.goto(url);
    await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720, deviceScaleFactor: 2 });
    const file = await page.screenshot();
    return file;
}

module.exports = async (req, res) => {
  if (!req.query.url) return res.status(400).send("No url query specified.");
  try {
    const file = await getScreenshot(req.query.url, req.query.width, req.query.height);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, immutable, no-transform, s-maxage=86400, max-age=86400");
    res.status(200).end(file);
  } catch (error) {
    console.error(error)
    res.status(500).send("The server encountered an error. You may have inputted an invalid query.");
  }
}

