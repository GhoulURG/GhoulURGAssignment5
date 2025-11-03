const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let recipes = [
  { id: 1, title: 'Pancakes', ingredients: ['flour','egg','milk'] },
];

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/api/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const r = recipes.find(x => x.id === id);
  if (r) return res.json(r);
  res.status(404).json({ error: 'Not found' });
});

app.post('/api/recipes', (req, res) => {
  const { title, ingredients } = req.body;
  if (!title || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const newRecipe = { id: recipes.length + 1, title, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Backend listening on ${port}`));
}

module.exports = app;
