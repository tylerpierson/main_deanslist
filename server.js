require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

// mongoose.connect(process.env.MONGO_URI)
// mongoose.connection.once('open', () => console.log('Databse On'))

//model
const teacherSchema = new mongoose.Schema({
    name: String,
    age: Number,
    class: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
})

const Teacher = mongoose.model('Teacher', teacherSchema)

const studentSchema = new mongoose.Schema({
    name: String
})

const Student = mongoose.model('Student', studentSchema)

// Create A Teacher

app.post('/teachers', async (req, res) => {
    try {
      const newTeacher = await Teacher.create(req.body)
      res.status(201).json(newTeacher)
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  })

// Update Teacher Date

app.put('/teachers/:id', async (req, res) => {
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {new: true} )
      res.status(202).json(updatedTeacher)
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
})

// Show A Teacher

app.get('/teachers/:id', async (req, res) => {
    try {
      const foundTeacher = await Teacher.findById(req.params.id)
      res.status(200).json(foundTeacher)
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
})

app.listen(3000, () => console.log('We here'))