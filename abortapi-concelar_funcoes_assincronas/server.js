import { createServer } from "http";
import { setTimeout } from "timers/promises";

const MAX_TIMEOUT = 1000;
async function handler(request, response) {
  const result = {
    name: 'Fabiano',
    age: 37,
    profession: 'Analyst'
  }

  await setTimeout(MAX_TIMEOUT);
  response.end(JSON.stringify(result));
}

createServer(handler)
  .listen(3000)
  .on(
    'listening',
    () => console.log('server listening on port 3000')
  );