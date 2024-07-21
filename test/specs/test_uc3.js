const LoginPage = require('../pageobjects/LoginPage');
const assert = require('assert');
const each = require('mocha-each');
const { validCredentials } = require('../testData/loginTestData');

describe('Test Login form with credentials by passing Username & Password', () => {
  each(validCredentials).it('UC-3 - Username: %s, Password: %s', async (username, password) => {

    logger.info(`Testing with Username: ${username}, Password: ${password}`);
    await LoginPage.setUsername(username);
    await LoginPage.setPassword(password);

    await LoginPage.login();

    const pageTitle = await browser.getTitle();
    logger.info(`Page title: ${pageTitle}`);

    assert.strictEqual(pageTitle, 'Swag Labs');
  });
});
