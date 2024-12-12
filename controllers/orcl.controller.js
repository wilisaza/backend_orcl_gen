import { orclApi } from '../api/crudOrclApi.js'
import { functions } from '../api/crudOrclFunctions.js'

export const orclCtrl= {

  getAllObjects : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData
    if (Object.keys(req.query).length === 0){
      outData = await orclApi.getAll(req.params.object, req.headers)
    }
    else{
      outData = await orclApi.getFiltered(req.params.object, req.query, req.headers)
    }
    res.json(outData)
  },

  getCountObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.getCount(req.params.object, req.query, req.headers)
    res.json(outData)
  },

  getMaxObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.getMax(req.params.object, req.params.field, req.query, req.headers)
    res.json(outData)
  },

  postObject: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }
    let outData = {}
    if (Array.isArray(req.body))
      outData = await orclApi.executeTransaction(req.params.object, req.body, req.headers)

    if (!Array.isArray(req.body))
      outData = await orclApi.insertOne(req.params.object, req.body, req.headers)
    
    res.json(outData)
  },

  postQuery: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.executeQuery(req.body, req.headers)
    res.json(outData)
  },

  postTransaction: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    if (!Array.isArray(req.body)){
      res.status(400).json({ success:false, error: 'Body requires an array' })
      return
    }

    let outData = {}
    if (Array.isArray(req.body))
      outData = await orclApi.executeTransaction('', req.body, req.headers)
    
    res.json(outData)
  },

  putObjects: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.updateFiltered(req.params.object, req.body, req.query, req.headers)
    res.json(outData)
  },

  deleteObjects: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.deleteFiltered(req.params.object, req.query, req.headers)
    res.json(outData)
  },

  postFunctionObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    //let outData = await orclApi.getFunction(req.params.nomFunction, req.query, req.headers);
    let outData = await orclApi.getFunction(req.params.nomFunction, req.body, req.headers)
    res.json(outData)
  },

  postAllCustomObjects : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.getCustomSelect(req.params.object, req.body, req.query, req.headers)
    res.json(outData)
  },

  postProcedureObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await orclApi.postProcedure(req.params.nomProcedure, req.body, req.headers)
    res.json(outData)
  },

}
