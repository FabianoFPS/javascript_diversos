import { expect, test, describe, beforeEach } from "@jest/globals";
import superTest from "supertest";

import Server from '../../src/server.js';

describe('API e2e test suite', () => {
  beforeEach(async () => {
    await superTest(Server)
      .delete('/');
  })

  test('POST / - should save an item and return id', async () => {
    const response = await superTest(Server)
    .post('/')
    .send({
      nome: 'Juca',
      age: 33,
    });
    
    const objExpectResponse = { ok: 1 };
    const expectedResponse = JSON.stringify(objExpectResponse);
    
    expect(response.text).toStrictEqual(expectedResponse);
    
    const data = JSON.parse(response.text);
    expect(data).toStrictEqual(objExpectResponse);
  });

  test('GET / - should return an array',async () => {
    const response = await superTest(Server)
    .get('/');
    
    const data = JSON.parse(response.text);
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toEqual(0);
  });

  test('DELETE / - should remove all itens', async () => {
    await superTest(Server)
    .post('/')
    .send({
      nome: 'Juca',
      age: 33,
    });

    const deleteResponde =  await superTest(Server)
      .delete('/');
    const expectedDeleteResponse = JSON.stringify({ ok: 1});
        
    const getResponse = await superTest(Server)
    .get('/');
    const getData = JSON.parse(getResponse.text);
    const expectedGetResponse = [];
    
    expect(deleteResponde.text).toStrictEqual(expectedDeleteResponse);
    expect(getData).toStrictEqual(expectedGetResponse);
  });
});