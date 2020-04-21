const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4')

const app = express();

app.use(cors());

app.use(express.json());

const project = [];

function logRequests(request, response, next){
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);
  return next();
}

app.use(logRequests);

app.get('/projects', (request, response) => {
  const { title } = request.query;
  
  const results = title 
    ? project.filter(projects => projects.title.includes(title))
    : project;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const {title, owner} = request.body;
  const projects = { id: uuid(), title, owner };
  project.push(projects);
  return response.json(projects);
});


app.put('/project/:id', (request, response) => {
  const { id } = request.params;
  const {title, owner} = request.body;
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error:'Project not found'})
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project; 
  return response.json(project);
});


app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectIndex = project.findIndex(projects => projects.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error:'Project not found'})
  }

  project.splice(projectIndex, 1);
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('❤ Back-end started');
});