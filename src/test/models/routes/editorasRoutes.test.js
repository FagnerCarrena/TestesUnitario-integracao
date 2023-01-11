/* eslint-disable no-template-curly-in-string */
import {
  afterEach, beforeEach, describe, expect, it,
  jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});
afterEach(() => { server.close(); });

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

// eslint-disable-next-line no-unused-vars, semi
let idResposta;
describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app);
    await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao PAulo',
        email: 's@s.com',
      })
      .expect(201);
    idResposta = resposta.body.content.id;
  });
});
it('Deve nao adiciona nada no body vazio', async () => {
  await request(app)
    .post('/editoras')
    .send({})
    .expect(400);
});

describe('PUT em /editoras/id', () => {
  test.each([
    ['nome', { nome: 'Casa do Codigo' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

// describe('DELETE em /editoras/id', () => {
//   it('Deletar o recurso adicionado', async () => {
//     await request(app)
//       .delete('/editoras/${idResposta}')
//       .expect(200);
//   });
// });
