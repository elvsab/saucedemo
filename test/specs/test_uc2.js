const LoginPage = require('../pageobjects/LoginPage');
const assert = require('assert');
const each = require('mocha-each');

describe(' Test Login form with credentials by passing Username', () => {
  const testData = [
    ['test_user', 'test_password', 'Epic sadface: Username is required'],
    ['another_user', 'another_password', 'Epic sadface: Username is required']
  ];

  each(testData).it('UC-2 - Username: %s, Password: %s', async (username, password, expectedErrorMessage) => {
    logger.info('Navigated to Login Page');
    await LoginPage.open();

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



