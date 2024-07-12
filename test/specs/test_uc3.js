 const LoginPage = require('../pageobjects/LoginPage');
 const assert = require('assert');
 const each = require('mocha-each');
 
 describe('Test Login form with credentials by passing Username & Password', () => {
   const testData = [
     ['standard_user', 'secret_sauce']
   ];
 
   each(testData).it('UC-3 - Username: %s, Password: %s', async (username, password) => {
     logger.info('Navigated to Login Page');
     await LoginPage.open();
 
     logger.info(`Testing with Username: ${username}, Password: ${password}`);
     await LoginPage.setUsername(username);
     await LoginPage.setPassword(password);
 
     await LoginPage.login();
 
     const pageTitle = await browser.getTitle();
     logger.info(`Page title: ${pageTitle}`);
 
     assert.strictEqual(pageTitle, 'Swag Labs');
   });
 });
 