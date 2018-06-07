const config = require('./config')
const utils = {
  findMagic: (minerals, inventory) => {
    let cmp = config.AvailableMagicMixes;
    for (let magic in cmp) {
      if (cmp.hasOwnProperty(magic)) {
        let requiredMinerals = cmp[magic];
        let found = true;
        for(let mineral of minerals) {
          if(!cmp[magic][mineral]) {
            found = false;
            break;
          }
          else if(inventory[mineral] < cmp[magic][mineral]) {
            //If the inventory doesn't have enough materials then we can't forge it.
            found = false;
            break;
          }
        }
        if(found) {
          //Onnce we are able to found the mineral we can decrease the client inventory of minerals
          for(let mineral of minerals) {
            inventory[mineral] = inventory[mineral] - cmp[magic][mineral];
          }
          return magic;
        }
      }
    }
    return '';
  },
  initInventory: () => {
    // all the items init with 100
    return config.MINERALS.reduce( (obj,item) => {
       obj[item]=100;
       return obj;
     }, {});
  },
};
module.exports = utils;
