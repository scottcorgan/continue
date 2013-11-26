var Continue = require('../');
var expect = require('expect.js');

describe('Continue', function () {
  var chain;
  
  beforeEach(function () {
     chain = Continue();
  });
  
  it('Chain instance is a method', function () {
    expect(chain).to.be.a('function');
  });
  
  describe('#add()', function() {
    it('adds methods to the methods list with the given name', function () {
      chain.add('method1');
      expect(chain.getMethod('method1')).to.not.be(undefined);
    });
    
    it('adds a method to the methods list with the given definition', function () {
      var method = function (next) {
        next();
      };
      chain.add('method1', method);
      
      expect(chain.getMethod('method1')).to.be.a('function');
      expect(chain.getMethod('method1').toString()).to.equal(method.toString());
    });
    
    it('defaults to an empty method if no method definition is given', function () {
      chain.add('method1');
      expect(chain.getMethod('method1')).to.be.a('function');
    });
    
    it('adds the method definition to the object chain', function () {
      var method = function (next) {next();};
      chain.add('method1', method);
      
      expect(chain().method1.toString()).to.equal(method.toString());
    });
  })
});
