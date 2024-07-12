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
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (passed) {
          logger.info(`Test passed: ${test.parent} - ${test.title}`);
        } else {
          logger.error(`Test failed: ${test.parent} - ${test.title}`);
          logger.error(error);
        }
    }
}