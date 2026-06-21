const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store for simplicity
const users = []; // { id, name, email, password, role: 'founder' | 'investor' }
const projects = [
  { id: 1, founderId: 1, title: 'AI Health Assistant', description: 'تطبيق ذكاء اصطناعي لتتبع الصحة العامة.', fundingNeeded: 50000 },
  { id: 2, founderId: 2, title: 'EcoDelivery', description: 'خدمة توصيل صديقة للبيئة باستخدام الدراجات الكهربائية.', fundingNeeded: 20000 }
];
const investorsInfo = [
  { id: 1, userId: 3, name: 'أحمد محمود', interests: 'AI, Health Tech', maxInvestment: 100000 },
  { id: 2, userId: 4, name: 'سارة خالد', interests: 'Green Energy, Logistics', maxInvestment: 50000 }
];

let nextUserId = 5;
let nextProjectId = 3;

// Register Endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const user = { id: nextUserId++, name, email, password, role };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name, role } });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get all projects (for investors)
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Add a new project (for founders)
app.post('/api/projects', (req, res) => {
  const { founderId, title, description, fundingNeeded } = req.body;
  const project = { id: nextProjectId++, founderId, title, description, fundingNeeded };
  projects.push(project);
  res.status(201).json(project);
});

// Get all investors (for founders)
app.get('/api/investors', (req, res) => {
  res.json(investorsInfo);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
