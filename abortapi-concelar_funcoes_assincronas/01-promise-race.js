// fetch é experimental, tem que executar com node --experimental-fetch
import assert from "assert";

const URL = 'http://localhost:3000';

async function race(request, limitTimeout) {
  const limiter = new Promise((_resolve, reject) => setTimeout(reject, limitTimeout));
  
  return Promise.race([
    request,
    limiter
  ])
}

{
  const limitTimeout = 200;
  assert.rejects(async () => {
    const fetchResult = await race(fetch(URL), limitTimeout);
    return fetchResult.json();
  })
}

{
  const limitTimeout = 2000;
    const fetchResult = await race(fetch(URL), limitTimeout);
    const result = await fetchResult.json();
    const expected = {
      name: 'Fabiano',
      age: 37,
      profession: 'Analyst'
    };
  
    assert.deepStrictEqual(result, expected);
}