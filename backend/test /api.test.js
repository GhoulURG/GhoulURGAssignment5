const request = require('supertest');
const app = require('../server');

describe('Recipe API', () => {
  test('GET /api/recipes returns a list', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/recipes/:id returns one recipe', async () => {
    const res = await request(app).get('/api/recipes/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });

  test('POST /api/recipes creates a recipe', async () => {
    const sample = { title: 'Test Dish', ingredients: ['a','b'] };
    const res = await request(app).post('/api/recipes').send(sample);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ title: 'Test Dish' });
  });

  test('POST /api/recipes validates input', async () => {
    const res = await request(app).post('/api/recipes').send({ title: 'bad' });
    expect(res.statusCode).toBe(400);
  });
});
