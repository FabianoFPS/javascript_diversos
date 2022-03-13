import axios from "axios";
import { Transform, Writable } from 'stream';

const url = 'http://localhost:3000';

async function consumo() {
  const response = await axios({
    url,
    method: 'get',
    responseType: 'stream',
  });

  return response.data;
}

const stream = await consumo();
stream
  .pipe(
    new Transform({
      transform(chunk, enc, cb) {
        const item = JSON.parse(chunk);
        const myNumber = /\d+/.exec(item.name)[0];
        let { name } = item;

        const sufix = (myNumber % 2 === 0)
        ? ' é par'
        : ' é impar';
        
        item.name = name.concat(sufix);
        
        cb(null, JSON.stringify(item));
      }
    })
    )
    .pipe(
      Transform({
        transform(chunk, enc, cb) {
        // forma de usar processamento asincrono
        (async () => {
          return new Promise(function(resolve, reject) {
            // fazer algo, possivelmente async, depois…
          
            if (true) {
              const item = JSON.parse(chunk);
              const dado = JSON.stringify(item).toUpperCase()
              resolve(dado);
            }
            else {
              reject(Error("Deu errado"));
            }
          })
        })().then((dado) => {
          cb(null, dado);
        }
        );
      }
    })
  )
  .pipe(
    new Writable({
      write(chunk, inc, cb) {
        console.log('chegou: ', chunk.toString());
        cb();
      }
    })
  )