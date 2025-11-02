const request = require('supertest');
const app = require('../server');

describe('Recipe API', () => {
  it('GET /api/recipes returns list', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

  it('GET /api/recipes/:id returns single recipe', async () => {
    const list = await request(app).get('/api/recipes');
    const id = list.body[0].id;
    const res = await request(app).get(`/api/recipes/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.title).toBeDefined();
  });

  it('POST /api/recipes creates a recipe', async () => {
    const payload = { title: 'Unit Test Pancakes', ingredients: ['flour','egg'], steps: ['mix','cook'] };
    const res = await request(app).post('/api/recipes').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(payload.title);

    // verify it's in the list
    const list = await request(app).get('/api/recipes');
    expect(list.body.find(r => r.title === payload.title)).toBeDefined();
  });

  it('GET non-existing returns 404', async () => {
    const res = await request(app).get('/api/recipes/999999');
    expect(res.statusCode).toBe(404);
  });

  it('POST without title returns 400', async () => {
    const res = await request(app).post('/api/recipes').send({});
    expect(res.statusCode).toBe(400);
  });
});

  describe('POST /api/recipes', () => {
    test('should create a new recipe', async () => {
      const newRecipe = {
        name: 'Test Recipe',
        ingredients: 'Test ingredient 1\nTest ingredient 2',
        instructions: 'Test instructions',
        cookTime: '30 minutes'
      };

      const response = await request(app)
        .post('/api/recipes')
        .send(newRecipe)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newRecipe.name);
      expect(response.body.ingredients).toBe(newRecipe.ingredients);
      expect(response.body.instructions).toBe(newRecipe.instructions);
      expect(response.body.cookTime).toBe(newRecipe.cookTime);
    });

    test('should return 400 for invalid recipe data', async () => {
      const invalidRecipe = {
        name: '', // Empty name should fail
        ingredients: '',
        instructions: '',
        cookTime: '' 
      };

      await request(app)
        .post('/api/recipes')
        .send(invalidRecipe)
        .expect(400);
    });
  });

  describe('GET /api/recipes/:id', () => {
    test('should return a specific recipe', async () => {
      const response = await request(app)
        .get('/api/recipes/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
    });

    test('should return 404 for non-existent recipe', async () => {
      await request(app)
        .get('/api/recipes/999')
        .expect(404);
    });
  });

  describe('DELETE /api/recipes/:id', () => {
    test('should delete an existing recipe', async () => {
      // First create a recipe to delete
      const newRecipe = {
        name: 'Recipe to Delete',
        ingredients: 'Ingredient 1',
        instructions: 'Instructions',
        cookTime: '20 minutes'
      };

      const createResponse = await request(app)
        .post('/api/recipes')
        .send(newRecipe)
        .expect(201);

      const recipeId = createResponse.body.id;

      // Then delete it
      await request(app)
        .delete(`/api/recipes/${recipeId}`)
        .expect(204);

      // Verify it's deleted
      await request(app)
        .get(`/api/recipes/${recipeId}`)
        .expect(404);
    });

    test('should return 404 for deleting non-existent recipe', async () => {
      await request(app)
        .delete('/api/recipes/999')
        .expect(404);
    });
  });

  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
