import { createServer } from "http";
import { once } from  'events';
import { randomUUID } from "crypto";

const Database = new Map();

function respondJSON(data, response) {
  return response.end(JSON.stringify(data));
}

async function handler(request, response) {
  const { method } = request;

  switch (method) {
    case 'GET':
      return respondJSON([...Database.values()], response);
  
    case 'POST':
      const body = JSON.parse(await once(request, 'data'));
      const id = randomUUID();

      Database.set(id, body);

      return respondJSON({ ok: 1 }, response);
      
    case 'DELETE':
      Database.clear();
      return respondJSON({ok: 1}, response);
        
    default:
      break;
  }
}

export default createServer(handler);
