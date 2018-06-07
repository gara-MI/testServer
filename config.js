const config = {
  HOST: process.env.HOST||'localhost',
  PORT: 3000,
  MINERALS: ['BlueGem',
    'Flint',
    'Gems',
    'GoldNugget',
    'GreenGem',
    'IridescentGem',
    'Limestone',
    'Marble',
    'MoonRock',
    'Nitre',
    'Obsidian',
    'OrangeGem',
    'PurpleGem',
    'RedGem',
    'Rocks',
    'Thulecite',
    'ThuleciteFragments',
    'YellowGem'],
  AvailableMagicMixes: {
    'MAGIC1': {'BlueGem':1, 'Flint':2, 'Gems':3},
    'MAGIC2': {'Flint':4, 'Gems':5, 'GoldNugget':6},
    'MAGIC3': {'Gems':9, 'GoldNugget':8, 'GreenGem':7},
    'MAGIC4': {'GoldNugget':10, 'GreenGem':11, 'IridescentGem':12},
    'MAGIC5': {'Thulecite':15, 'Flint':14, 'PurpleGem':13}
  }
}

module.exports = config;
