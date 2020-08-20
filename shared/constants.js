const PACK_TYPES = {
  starter: {
    cost: 0,
    raresPerPack: 0,
    uncommonsPerPack: 2,
    commonsPerPack: 4
  },
  basic: {
    cost: 1,
    raresPerPack: 1,
    uncommonsPerPack: 2,
    commonsPerPack: 3,
  },
  premium: {
    cost: 2,
    raresPerPack: 3,
    uncommonsPerPack: 2,
    commonsPerPack: 1,
  }
}

const NUM_REQUIRED_TO_EVOLVE = 3;

module.exports = {
  PACK_TYPES,
  NUM_REQUIRED_TO_EVOLVE
};
