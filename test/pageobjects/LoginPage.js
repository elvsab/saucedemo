class LoginPage {
    get userNameField() { return $("input#user-name"); }
    get passwordField() { return $("input#password"); }
    get loginButton() { return $('input#login-button'); }
    get errorMessage() { return $('h3[data-test="error"]'); }
    get errorForm() { return $('.error-message-container'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async setUsername(username) {
        await this.userNameField.setValue(username);
    }

    async setPassword(password) {
        await this.passwordField.setValue(password);
    }

    async setUsernameJs(username) {
        await browser.execute((username) => {
            document.querySelector("input#user-name").value = username;
        }, username);
    }

    async setPasswordJs(password) {
        await browser.execute((password) => {
            document.querySelector("input#password").value = password;
        }, password);
    }


    async clearUsername() {
        await this.userNameField.clearValue();
    }

    async clearPassword() {
        await this.passwordField.clearValue();
    }

    async clearPasswordJS() {
        await browser.execute(() => {
            document.querySelector("input#password").value = "";
        });
    }

    async login() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }

    async isErrorDisplayed() {
        return await this.errorForm.isDisplayed();
    }

    async waitForPasswordFieldToClear() {
        await browser.waitUntil(async () => {
            return (await this.passwordField.getValue()) === "";
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected password field to be cleared'
        });
    }

    async executeClearFields() {
        await browser.execute(() => {
            document.querySelector("input#user-name").value = "";
            document.querySelector("input#password").value = "";
        });
    }

    async waitForPasswordFieldToClear() {
        await browser.waitUntil(async () => {
            return (await this.passwordField.getValue()) === "";
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected password field to be cleared'
        });
    }

    async waitForClearFields() {
        await browser.waitUntil(async () => {
            const userValue = await this.userNameField.getValue();
            const passwordValue = await this.passwordField.getValue();
            return userValue === "" && passwordValue === "";
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected input fields to be cleared'
        });
    }
}

module.exports = new LoginPage();


/*
class LoginPage {
    get userNameField() { return $("input#user-name"); }
    get passwordField() { return $("input#password"); }
    get loginButton() { return $('input#login-button'); }
    get errorMessage() { return $('h3[data-test="error"]'); }
    get errorForm() { return $('.error-message-container'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async setUsername(username) {
        await browser.execute((username) => {
            document.querySelector("input#user-name").value = username;
        }, username);
    }

    async setPassword(password) {
        await browser.execute((password) => {
            document.querySelector("input#password").value = password;
        }, password);
    }

    async clearPasswordWithJS() {
        await browser.execute(() => {
            document.querySelector("input#password").value = "";
        });
    }

    async login() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }

    async isErrorDisplayed() {
        return await this.errorForm.isDisplayed();
    }

    async waitForPasswordFieldToClear() {
        await browser.waitUntil(async () => {
            return (await this.passwordField.getValue()) === "";
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected password field to be cleared'
        });
    }

    async executeClearFields() {
        await browser.execute(() => {
            document.querySelector("input#user-name").value = "";
            document.querySelector("input#password").value = "";
        });
    }

    async waitForClearFields() {
        await browser.waitUntil(async () => {
            const userValue = await this.userNameField.getValue();
            const passwordValue = await this.passwordField.getValue();
            return userValue === "" && passwordValue === "";
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected input fields to be cleared'
        });
    }
}

module.exports = new LoginPage();
*/