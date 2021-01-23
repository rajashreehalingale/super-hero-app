import models from '../models'

export const getAllTeams = async (request, response) => {
  try {
    const teams = await models.teams.findAll()

    return response.send(teams)
  } catch (error) {
    return response.status(500).send('Unable to retrieve teams, please try again')
  }
}

export const getAllTeamsByID = async (request, response) => {
  const { id } = request.params

  const foundTeam = await models.teams.findOne({ where: { id } })

  return response.send(foundTeam)
}

export const saveNewTeam = async (request, response) => {
  const {
    location, mascot, abbreviation, conference, division,
  } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    return response.status(400).send('All fields required: location, mascot, abbreviation, conference, division')
  }

  const newTeam = await models.teams.create({
    location, mascot, abbreviation, conference, division,
  })

  return response.status(201).send(newTeam)
}
