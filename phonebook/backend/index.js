require('dotenv').config()
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

const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response, next) => {
    var {name, number} = request.body

    const person = new Person({
        name: name,
        number: number,
    })

    person.save()
        .then(savedPerson => {
        response.json(savedPerson)
        })
        .catch(error => next(error))

})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(person => {
            const numberOfContact = person.length
            const date = new Date()
            const message = `Phonebook has infos for ${numberOfContact} contacts <br/> ${date}`        
            response.send(message)
        })
        .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Person.findByIdAndUpdate(
        request.params.id, 
        {name, number}, 
        {new:true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))    
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))    
})

const unknownEndpoint = (request, response) => {
    response.status(404).end()
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    console.log(error.message)
    console.log(error.name)
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).send({error: error.message})
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)