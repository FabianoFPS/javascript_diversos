import assert from "assert";

const URL = 'http://localhost:3000';
const tracker = new assert.CallTracker();

process.on('exit', () => tracker.verify());

{
  const limitTimeout = 200;
  const abortController = new AbortController()
  setTimeout(() => abortController.abort(), limitTimeout);

  assert.rejects(async () => {
    const fetchResult = await fetch(URL, {
      signal: abortController.signal
    });

    return fetchResult.json()
  }, {
    message: 'The operation was aborted',
    name: 'AbortError'
  });
}

{
  const limitTimeout = 200;
  const signal = AbortSignal.timeout(limitTimeout);

  assert.rejects(async () => {
    const fetchResult = await fetch(URL, {
      signal
    });

    return fetchResult.json()
  }, {
    message: 'The operation was aborted',
    name: 'AbortError'
  });
}
{
  const limitTimeout = 200;
  const signal = AbortSignal.timeout(limitTimeout);

  assert.rejects(async () => {
    const fetchResult = await fetch(URL, {
      signal
    });

    return fetchResult.json()
  }, {
    message: 'The operation was aborted',
    name: 'AbortError'
  });
}

{
  const limitTimeout = 200;
  const signal = AbortSignal.timeout(limitTimeout);
  const expectedCont = 1;
  signal.onabort = tracker.calls(expectedCont)
  assert.rejects(async () => {
    const fetchResult = await fetch(URL, {
      signal
    });

    return fetchResult.json()
  }, {
    message: 'The operation was aborted',
    name: 'AbortError'
  });
}
{
  const limitTimeout = 200;
  const signal = AbortSignal.timeout(limitTimeout);
  const expectedCont = 1;
  signal.onabort = tracker.calls(expectedCont)
  assert.rejects(async () => {
    const fetchResult = await fetch(URL, {
      signal
    });

    return fetchResult.json()
  }, {
    message: 'The operation was aborted',
    name: 'AbortError'
  });
}

{
  const limitTimeout = 2000;
  const signal = AbortSignal.timeout(limitTimeout);

  const fetchResult = await fetch(URL, {
    signal
  });

  const result = await fetchResult.json();
    const expected = {
      name: 'Fabiano',
      age: 37,
      profession: 'Analyst'
    };
  
    assert.deepStrictEqual(result, expected);

}

