import http from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';

function* run () {
  for (let index = 0; index < 99; index++) {
    const data = {
      id: randomUUID(),
      name: `data-${index}`
    }

    yield data;
  }
}

async function handler(request, response) {
  const readable = new Readable({
    read() {
      for (const data of run()) {
        console.log('sending:', data);
        this.push(JSON.stringify(data) + '\n');
      }

      // para informar que os dados acabaram -> push null
      this.push(null)
    }
  });

  readable
    .pipe(response);
}

http.createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('server running as 3000'));