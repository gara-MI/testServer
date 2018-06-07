const express = require('express');
const config = require('./config');
const utils = require('./utils');
const path = require('path');
const crypto = require('crypto');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var app = express();
var userInventoryStore={};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

// set a cookie
app.use(function (req, res, next) {
  var cookie = req.cookies.alchemyInventory;
  if (cookie === undefined || !userInventoryStore.hasOwnProperty(cookie)) {
    //create random crypto hash which can be used as cookie
    var cryptoRandom = crypto.randomBytes(20).toString('hex');
    res.cookie('alchemyInventory', cryptoRandom, {httpOnly: true });

    //init user inventory
    const minerals = utils.initInventory();
    userInventoryStore[cryptoRandom] = {
      minerals:minerals,
      userMagicMixesAvailable:{},
    };

    //add it to incoming request.
    req.inventory = userInventoryStore[cryptoRandom];
    console.log('cookie created successfully');
  }
  else {
    req.inventory = userInventoryStore[cookie];
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});

app.use(express.static('public'));

app.get('/getMinerals', (req, res) => {
  res.send(req.inventory.minerals);
});

app.get('/getMagicPotionsMinerals', (req, res) => {
  res.send(config.AvailableMagicMixes);
});

app.get('/getExistingMagicPotions', (req, res) => {
  res.send(req.inventory.userMagicMixesAvailable);
});

app.post('/createMagicPotion', (req, res) => {
  console.log('checking for magix mix for minerals: ' + req.body);
  if(req.body.mineral.length != 3) {
    res.send({status:'failed', message:'you should select 3 minerals for magical potion to be created'});
    return;
  }

  let magicPotion = utils.findMagic(req.body.mineral, req.inventory.minerals);

  if(config.AvailableMagicMixes.hasOwnProperty(magicPotion)) {
    if(req.inventory.userMagicMixesAvailable.hasOwnProperty(magicPotion)) {
      req.inventory.userMagicMixesAvailable[magicPotion] = req.inventory.userMagicMixesAvailable[magicPotion] + 1;
    }
    else {
      req.inventory.userMagicMixesAvailable[magicPotion] = 1;
    }
    res.send({status:'success', magicPotion:magicPotion, userMagicMixesAvailable : req.inventory.userMagicMixesAvailable});
  }
  else {
    res.send({status:'failed', message:'No magical mix can be created with the selected minerals'});
  }
});

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}!`);
});
