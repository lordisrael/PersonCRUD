const express = require('express')
const router = express.Router()

const {createPerson, getPerson, updatePerson, deletePerson} = require('../controllers/authCtrl')

router.post('/', createPerson)
// router.get('/getPerson' ,getPeople)
router.get('/:param', getPerson)
router.delete('/:param', deletePerson)
router.patch('/:param', updatePerson)


module.exports = router