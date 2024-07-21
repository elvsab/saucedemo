const LoginPage = require('../pageobjects/LoginPage');
const assert = require('assert');
const each = require('mocha-each');
const { credentialsWithUsername } = require('../testData/loginTestData');

describe('Test Login form with credentials by passing Username', () => {
  each(credentialsWithUsername).it('UC-2 - Username: %s, Password: %s', async (username, password, expectedErrorMessage) => {

    logger.info(`Testing with Username: ${username}, Password: ${password}`);
    await LoginPage.setUsernameJs(username);
    await LoginPage.setPasswordJs(password);

    // Clear the password field
    await LoginPage.clearPasswordJS();

    // Ensure the password field is empty
    await LoginPage.waitForPasswordFieldToClear();
    
    // Try to login
    await LoginPage.login();

    // Check the error message
    const errorMessage = await LoginPage.getErrorMessage();
    logger.info(`Error message: ${errorMessage}`);

    assert.strictEqual(errorMessage, expectedErrorMessage);
  });
});
