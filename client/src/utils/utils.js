import IP from '../ip';

const antiCache = tshirts => tshirts.map((tshirt) => {
    tshirt.source = `http://${IP}:3333/front_${tshirt.id}.png?s=${Math.floor(
      Math.random() * 100000,
    )}`;
    tshirt.sourceBack = `http://${IP}:3333/back_${tshirt.id}.png?s=${Math.floor(
      Math.random() * 100000,
    )}`;
    return tshirt;
});

export default antiCache;