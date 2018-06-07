const expect = require('chai').expect;
const request = require('request');
const config = require('../config');
const uri = `http://${config.HOST}:${config.PORT}`;

describe('Testing Minerals and Magic mixes' , () => {
  var req = request.defaults({jar: true});
  it("Inital List of Minerals", done => {
    request.defaults({jar: true}).get(`${uri}/getMinerals`, {}, (err, response, body) => {
      if(err) done(err);
      var minerals = JSON.parse(body);
      var values = Object.values(minerals);
      for (val of values) {
        expect(val).to.equal(100);
      }
      expect(Object.keys(minerals)).to.deep.equal(config.MINERALS);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("get inital list of User Magic Mixes", done => {
    request.defaults({jar: true}).get(`${uri}/getExistingMagicPotions`, {}, (err, response, body) => {
      if(err) done(err);
      var potions = JSON.parse(body);
      expect(potions).to.be.empty;
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('Testing Magic Mixes' , () => {
  let listOfMagicMixes = config.AvailableMagicMixes;
  for(let magicPotion of Object.keys(listOfMagicMixes)) {
    let receipes = Object.keys(config.AvailableMagicMixes[magicPotion]);
    let jar = request.jar()
    it(`check ${magicPotion} MagiPotions validity`, done => {
        request.defaults({jar: jar}).post({
          uri: `${uri}/createMagicPotion`,
          json: true,
          body: {
            mineral: receipes
          }
        }, (err, response, body) => {
          if(err) done(err);
          expect(body.status).to.equal("success");
          expect(body.magicPotion).to.equal(magicPotion);
          expect(body.userMagicMixesAvailable[magicPotion]).to.equal(1);
          expect(response.statusCode).to.equal(200);
          done();
        });
    });

    it("Test list of User Magic Mixes", done => {
      request.defaults({jar: jar}).get(`${uri}/getExistingMagicPotions`, {}, (err, response, body) => {
        if(err) done(err);
        var potions = JSON.parse(body);
        let obj ={};
        obj[magicPotion] = 1;
        expect(potions).to.deep.equal(obj);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  }

});
