const puppeteer = require('puppeteer');
require('dotenv').config();
const fs = require('fs');

const username = process.env.ADMIN_ACCOUNT;
const password = process.env.ADMIN_PASSWORD;

// Specify the file path
const filePath = './accounts.txt';
// Read the file synchronously
const data = fs.readFileSync(filePath, 'utf8');
// Split the content by newlines and store it into an array
const lines = data.split(/\r?\n/);
// List of user IDs
const userIds = lines.map((line) => String(line).padStart(10, "0"));
console.log("userIDs:", userIds)

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=1920,1080`], defaultViewport: null, });
  const page = await browser.newPage();

  // Log in
  const loginUrl = "https://synesthesia.psy.unibe.ch/login";
  console.log(`Logging in as: ${username}`);
  await page.goto(loginUrl);
  await page.type("#section-36 > div > div.card-body > form > div:nth-child(1) > input", username);
  await page.type("#section-36 > div > div.card-body > form > div:nth-child(2) > input", password);
  await page.click("#section-36 > div > div.card-body > form > button");
  await page.waitForSelector("#navbarSupportedContent > ul.navbar-nav.navbar-right > li > a");
  console.log(`Successfully logged in as: ${username}`);

  for (const [index, userId] of userIds.entries()) {
    console.log("Iteration number:", index+1)
    const url = `https://synesthesia.psy.unibe.ch/admin/user/${userId}`;

    // Navigate to the URL
    console.log(`Navigating to user ${userId}`);
    await page.goto(url);

    // Click the button "Send Activation Email"
    const activationEmailXPath = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/form/button';
    await page.waitForXPath(activationEmailXPath);
    const sendActivationEmailButton = await page.$x(activationEmailXPath);
    await sendActivationEmailButton[0].click();
    console.log(`Clicked "Send Activation Email" button for user ${userId}`);
    await delay(800);

    // Click the button "Send Email". This actually sends the invitation
    const sendEmailXPath = '/html/body/div[2]/div[2]/div[2]/form/button';
    await page.waitForXPath(sendEmailXPath);
    const sendNowButton = await page.$x(sendEmailXPath);
    await sendNowButton[0].click();
    console.log(`Clicked "Send Email" button for user ${userId}`);
    await delay(1000);

    // Check for "Success"
    const textContent = await page.evaluate(() => document.querySelector('body > div.container.mt-3 > div > h1').textContent);
    if (textContent === "Success") {
      console.log(`h1 content: ${textContent}; Successfully processed user ${userId}`);
    } else {
      console.log(`h1 content: ${textContent}; Error processing user ${userId}`);
    }
    await delay(3500);
  }

  await delay(1000);
  // Close the browser
  await browser.close();
})();
