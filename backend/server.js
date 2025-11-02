const express = require('express');
const app = express();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let recipes = [
  { id: 1, title: 'Spaghetti', ingredients: ['pasta', 'tomato'], steps: ['boil', 'sauce'] },
  { id: 2, title: 'Toast', ingredients: ['bread','butter'], steps: ['toast','spread'] }
];

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/api/recipes/:id', (req, res) => {
  const r = recipes.find(x => x.id === Number(req.params.id));
  if (!r) return res.status(404).json({ error: 'Not found' });
  res.json(r);
});

app.post('/api/recipes', (req, res) => {
  const { title, ingredients = [], steps = [] } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const id = recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
  const newRecipe = { id, title, ingredients, steps };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Backend listening on ${port}`));
}

module.exports = app;
