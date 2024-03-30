const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('reqBody', (req, res) => {
    return JSON.stringify(req.body)
})

const morganConfig = morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.reqBody(req, res)

    ].join(' ')
})

app.use(cors())
app.use(express.json())
app.use(morganConfig)

var persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    var name = request.body.name
    var number = request.body.number

    if(persons.find(person => person.name === name)){
        response.json({ error: 'name must be unique' })
        response.sendStatus(400).end()
    }

    if(!number){
        response.json({ error: 'number must be provided' })
        response.sendStatus(400).end()
    }
    
    const newPerson = {
        name: name,
        number: number,
        id: Math.floor(Math.random() * 100000)
    }
    
    persons = persons.concat(newPerson)
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numberOfContact = persons.length
    const date = new Date()
    const message = `Phonebook has infos for ${numberOfContact} contacts <br/> ${date}`

    response.send(message)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
    
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)