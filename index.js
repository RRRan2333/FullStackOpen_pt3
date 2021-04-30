const express = require('express')
// const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// morgan.token('body', (req, res) => JSON.stringify(req.body));
// app.use(morgan(':method :url :status :response-time ms - :body'));

// let persons = [
//    {
//      name: "Arto Hellas",
//      number: "040-123456",
//      id: 1
//    },
//    {
//      name: "Ada Lovelace",
//      number: "39-44-5323523",
//      id: 2
//    },
//    {
//      name: "Dan Abramov",
//      number: "12-43-234345",
//      id: 3
//    },
//    {
//      name: "Mary Poppendieck",
//      number: "39-23-6423122",
//      id: 4
//    },
//    {
//      name: "testing",
//      number: "12345",
//      id: 5
//    },
//    {
//      name: "name",
//      number: "123",
//      id: 6
//    }
// ]

app.get('/', (request, response) => {
   response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
   Person.find({}).then(persons => {
      response.json(persons)
   })
})

// app.get('/api/info', (request, response) => {
//    response.send(
//       `<p>Phonebook has info for ${persons.length} people</p>
//       <p>${new Date()}</p>`
//    )
// })

app.get('/api/persons/:id', (request, response, next) => {
Person.findById(request.params.id)
   .then(person => {
      if (person) {
      response.json(person)
      } else {
      response.status(404).end()
      }
   })
   .catch(error => {
      console.log("WAT IS THIS")
      next(error)
   })
})

//  app.delete('/api/persons/:id', (request, response, next) => {
//    Person.findByIdAndRemove(request.params.id)
//      .then(result => {
//        response.status(204).end()
//      })
//      .catch(error => next(error))
//  })

app.post('/api/persons', (request, response) => {
const body = request.body

if (body.name === undefined || body.number === undefined) {
   return response.status(400).json({ error: 'name or number missing' })
}

const person = new Person({
   name: body.name,
   number: body.number
})

person.save().then(savedPerson => {
   response.json(savedPerson)
   })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})