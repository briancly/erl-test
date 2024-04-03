import { RateCounter, PenaltyBox, EdgeRateLimiter } from 'fastly:edge-rate-limiter';

addEventListener("fetch", event => {
  const rc = new RateCounter('rc')
  const pb = new PenaltyBox('pb')
  const erl = new EdgeRateLimiter(rc, pb)

  const entry = event.client.address;
  const delta = 1;
  const window = 60; // seconds
  const limit = 2;
  const timeToLive = 5; // minutes

  const blocked = erl.checkRate(entry, delta, window, limit, timeToLive);
  
  let response;
  if (blocked) {
    response =  new Response(`${entry} was blocked`)
  } else {
    response =  new Response(`${entry} was not blocked`)
  }
  event.respondWith(response)
})
