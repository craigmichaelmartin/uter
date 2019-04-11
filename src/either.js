/* eslint no-unused-vars: 0 no-empty-function: 0 */

const Right = x => ({
  map: f => Right(f(x)),
  flow: f => {
    const r = f(x);
    return r.isLeft ? r : Right(r);
  },
  doRight: f => f(x),
  doLeft: f => Right(x),
  tryfix: f => Right(x),
  mapRespective: (f, g) => Right(g(x)),
  fold: (f, g) => g(x),
  val: () => x,
  isRight: true,
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: f => Left(x),
  flow: f => Left(x),
  doRight: f => Left(x),
  doLeft: f => f(x),
  tryfix: f => f(x),
  mapRespective: (f, g) => Left(f(x)),
  fold: (f, g) => f(x),
  val: () => {
    throw x;
  },
  isLeft: true,
  inspect: () => `Left(${x})`
});

const fold = (f, g) => lor => (f && g ? lor.fold(f, g) : lor.fold(() => {}, f));
const map = f => lor => lor.map(f);
const flow = f => lor => lor.flow(f);
const doRight = f => lor => lor.doRight(f);
const doLeft = f => lor => lor.doLeft(f);

module.exports = {
  Right,
  Left,
  fold,
  map,
  flow,
  doRight,
  doLeft
};
