import { Router } from 'express'

export const router = Router()

import { orclCtrl } from '../controllers/orcl.controller.js'

router.get('/', function (req, res) {res.send('Hello World')})

router.get('/count/:object', orclCtrl.getCountObject)

router.get('/max/:object/:field', orclCtrl.getMaxObject)

router.get('/:object', orclCtrl.getAllObjects)

router.post('/custom/:object', orclCtrl.postAllCustomObjects)

router.post('/function/:nomFunction', orclCtrl.postFunctionObject)

router.post('/procedure/:nomProcedure', orclCtrl.postProcedureObject)

router.post('/query', orclCtrl.postQuery)

router.post('/transaction', orclCtrl.postTransaction)

router.post('/:object', orclCtrl.postObject)

router.put('/:object', orclCtrl.putObjects)

router.delete('/:object', orclCtrl.deleteObjects)

