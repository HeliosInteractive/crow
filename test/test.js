describe('Common JS', function(){

  it('should load common js format', function(){
    const crow = require('../');
    if( typeof crow !== 'function') throw new Error('crow is not a function');
  })
});