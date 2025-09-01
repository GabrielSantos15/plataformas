const directionRandom =  Math.random() > 0.5 ? "left" : "right"
const FrogInfos = {
  position: {
    x:
      platformsBlocks[indexBlock].position.x +
      platformsBlocks[indexBlock].width / 2,
    y: platformsBlocks[indexBlock].position.y - 40,
  },
  width: 50,
  height: 40,
  speed: 1,
  velocity: {
    x: 0,
    y: 0,
  },
  attackForce: 1,
  indexBlock: indexBlock,
  imageSrc: "assets/Enemy/Frog.png",
  scale: 1.5,
  frameMax: {
    x: 2,
    y: 1,
  },
  offset: { x: 15, y: 20 },
  inverter: directionRandom == "right",
  framesHold: 15,
  life: 2,
  direction: {
    up: false,
    down: false,
    right: directionRandom == "right",
    left: directionRandom == "left",
  },
};

const Bunny = {
  position: {
    x:
      platformsBlocks[indexBlock].position.x +
      platformsBlocks[indexBlock].width / 2,
    y: platformsBlocks[indexBlock].position.y - 40,
  },
  width: 50,
  height: 40,
  speed: 1,
  velocity: {
    x: 0,
    y: 0,
  },
  attackForce: 1,
  indexBlock: indexBlock,
  imageSrc: "assets/Enemy/Bunny.png",
  scale: 1.5,
  frameMax: {
    x: 3,
    y: 1,
  },
  offset: { x: 15, y: 20 },
  inverter: directionRandom == "right",
  framesHold: 15,
  life: 2,
  direction: {
    up: false,
    down: false,
    right: directionRandom == "right",
    left: directionRandom == "left",
  },
};
