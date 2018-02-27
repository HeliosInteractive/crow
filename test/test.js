describe('Common JS', function(){

  it('should load common js format', function(){
    const crow = require('../');
    if( typeof crow !== 'object') throw new Error('crow is not an object');
  })
});

describe('single application support', function() {
  
  const crow = require('../');
  
  it('should send log to woodpecker, with application specified', function(done) {
    crow.setUrl('http://localhost:4000/');
    crow.setApplication('test-crow');
    // add callback that waits for woodpecker server to finish processing log
    crow.onSuccess = function() {
      crow.onSuccess = undefined;
      // HACK woodpecker would run into an error if mocha doesn't keep the script running for a bit
      setTimeout(done, 300);
    };
    crow.onFailure = function(err) {
      crow.onFailure = undefined;
      done(new Error(err));
    }
    crow.info('Crow should send log to woodpecker, with application specified to test-crow');
    // Human, go check woodpecker log files
  })
});

describe('multi application support', function() {
  const crow = require('../');

  it('should send to multiple applications using crow.createLogger', function(done) {
    const logger1 = crow.createLogger({
      url: 'http://localhost:4000',
      application: 'logger1',
    });
    const logger2 = crow.createLogger({
      url: 'http://localhost:4000',
      application: 'logger2',
    });
    logger1.info('should send to multiple applications using crow.createLogger |||| from logger1.')
    logger2.info('should send to multiple applications using crow.createLogger |||| from logger2.')
    // Human, go check woodpecker log files.
    setTimeout(done, 1000);
  });

  it('should not modify default logger when creating new logger instances', function(done) {
    crow.configure({
      url: 'http://localhost:4000',
      application: 'test-crow',
    });
    const logger1 = crow.createLogger({
      url: 'http://localhost:4000',
      application: 'logger1',
    });
    logger1.info('should not modify default logger when creating new logger instances |||| from logger1');
    crow.info('should not modify default logger when creating new logger instances |||| from the default crow.');
    // Human, go check woodpecker log files.
    setTimeout(done, 1000);
  });

  // NOTE the tests below uses transport; transport is yet to be implemented.
  it('should send to multiple applications using transport', function() {
    const logger1 = crow.createLogger({
      transports: [
        new crow.transports.Woodpecker({
          url: 'http://localhost:4000',
          application: 'logger1',
        })
      ]
    });
    const logger2 = crow.createLogger({
      transports: [
        new crow.transports.Woodpecker({
          url: 'http://localhost:4000',
          application: 'logger2',
        })
      ]
    });
    logger1.info('This log was sent from logger1. The logger was created with transport.')
    logger2.info('This log was sent from logger2. The logger was created with transport.')
    // Human, go check woodpecker log files.
  })

  it('should send from one logger to multiple transports', function() {
    const loggerMultiTransport = crow.createLogger({transports: [
      new crow.transports.Woodpecker({
        url: 'http://localhost:4000',
        application: 'multi-transport-1'
      }),
      new crow.transports.Woodpecker({
        url: 'http://localhost:4000',
        application: 'multi-transport-1'
      })
    ]});
    loggerMultiTransport.info('This log was sent from loggerMultiTransport.');
    // Human, go check woodpecker log files
  });
})