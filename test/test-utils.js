const expect = require('chai').expect;
const config = require('../config');
const utils = require('../utils');

describe('Testing Utils Function', () => {
  it('init', done => {
    const init = utils.initInventory();
    var values = Object.values(init);
    for (val of values) {
      expect(val).to.equal(100);
    }
    done();
  });
  it('find the magic', done => {
    let listOfMagicMixes = config.AvailableMagicMixes;
    for(let magicPotion of Object.keys(listOfMagicMixes)) {
      let receipes = Object.keys(config.AvailableMagicMixes[magicPotion]);
      expect(utils.findMagic(receipes, utils.initInventory())).to.equal(magicPotion);
    }
    done();
  });

});
