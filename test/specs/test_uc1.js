const LoginPage = require('../pageobjects/LoginPage');
const assert = require('assert');
const each = require('mocha-each');
const { emptyCredentials } = require('../testData/loginTestData');

describe('Test Login form with empty credentials', () => {
  each(emptyCredentials).it('UC-1 - Username: %s, Password: %s', async (username, password, expectedErrorMessage) => {

    logger.info(`Testing with Username: ${username}, Password: ${password}`);
    await LoginPage.setUsernameJs(username);
    await LoginPage.setPasswordJs(password);

    // Clear the input fields using executeClearFields method
    await LoginPage.executeClearFields();

    // Ensure the fields are empty using waitForClearFields method
    await LoginPage.waitForClearFields();

    // Try to login
    await LoginPage.login();

    // Check the error message
    const errorMessage = await LoginPage.getErrorMessage();
    logger.info(`Error message: ${errorMessage}`);

    assert.strictEqual(errorMessage, expectedErrorMessage);
  });
});
