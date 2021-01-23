import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import config from './config/sequelize'
import { getAllHeroes, getHeroBySlug, saveNewHero } from './controllers/heroes'
import { getAllTeams, getAllTeamsByID, saveNewTeam } from './controllers/teams'

const app = express()

app.use(express.static('public'))

// a demo-only or dev-only endpoint for debugging the app
// allows us to see env vars working
app.get('/debug-the-config', (request, response) => {
  response.send(config)
})

// handle "root" url endpoint
app.get('/api/heroes', getAllHeroes)

// handler filtering based on value sent in the url
app.get('/api/heroes/:slug', getHeroBySlug)

// add a new record to the database
app.post('/api/heroes', bodyParser.json(), saveNewHero)

app.get('/api/teams', getAllTeams)
app.get('/api/teams/:ID', getAllTeamsByID)
app.post('/api/teams', bodyParser.json(), saveNewTeam)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(3009, () => {
  console.log('Listening on port 3009...') // eslint-disable-line no-console
})
