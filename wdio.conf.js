const log4js = require('log4js');

// log4js config
log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'logs/test.log' },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['file', 'console'], level: 'info' } }
});

const logger = log4js.getLogger('default');

exports.config = {
    runner: 'local',
  
    specs: [
        './test/specs/**/*.js'
    ],
    
    exclude: [
       
    ],
    
    maxInstances: 10,
  
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'MicrosoftEdge'
    }],

    logLevel: 'info',
    bail: 0,
    
    waitforTimeout: 10000,
   
    connectionRetryTimeout: 120000,
   
    connectionRetryCount: 3,
    
    framework: 'mocha',
    
    
    reporters: ['spec'],

    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: function (capabilities, specs) {
        global.logger = logger;
    },
    beforeTest: async function (test, context) {
      logger.info(`Starting test : ${test.title}`);
      await browser.url('https://www.saucedemo.com/');
      logger.info('Opened the login page');
    },
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (passed) {
          logger.info(`Test passed: ${test.parent} - ${test.title}`);
        } else {
          logger.error(`Test failed: ${test.parent} - ${test.title}`);
          logger.error(error);
        }
    },
    after: async function (result, capabilities, specs) {
      logger.info('Clearing cash after tests execution');
      
      await browser.deleteAllCookies();
      await browser.execute('window.localStorage.clear();');
      await browser.execute('window.sessionStorage.clear();');
  
      logger.info('Cleared cookies, local storage, and session storage');
    }
}