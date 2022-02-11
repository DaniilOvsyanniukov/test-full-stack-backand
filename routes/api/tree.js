const express = require('express')
const router = express.Router()
const Joi = require('joi')

const schema = Joi.object(
  {
    name: Joi.string().min(3).max(30).required().regex(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),
    age: Joi.number().min(1).max(150).required(),
    parents: Joi.string(),
    owner: Joi.string(),
    id: Joi.string()
  })

const {
  listFamily,
  removeFamily,
  addFamily,
  updateFamily
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const { id } = req.query
    const members = await listFamily(id)
    res.status(200)
    res.json(members)
  } catch (error) {
    res.json({ message: 'You did not create a tree' })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, age, parents, owner } = await schema.validateAsync(req.body)
    const newMember = { name, age, parents, owner }
    await addFamily(newMember)
    const members = await listFamily(owner)
    res.status(201)
    res.json(members)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json({ message: error.message })
  }
})

router.delete('/:memberId', async (req, res, next) => {
  const memberId = req.params.memberId
  const member = await removeFamily(memberId)
  if (member === void 0) {
    res.status(404)
    res.json({ message: 'Not found' })
  }
  const members = await listFamily(member.pop().owner)
  res.status(200)
  res.json(members)
})

router.put('/:memberId', async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body)
    const updatedMember = await updateFamily(req.params.memberId, body)
    if (!updatedMember) { res.json({ message: 'Not found' }) }
    const members = await listFamily(body.owner)
    res.status(200)
    res.json(members)
  } catch (error) {
    res.status(400)
    res.json({ message: error.message })
  }
})

module.exports = router
