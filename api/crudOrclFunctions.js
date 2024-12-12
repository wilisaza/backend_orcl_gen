import { decodeString } from '../functions/encodeDecodeFunctions.js'

export const functions = {

  jsonDateCam(date) {
    return date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8)
  },

  dateToYMD(date) {
    var d = date.getDate()
    var m = date.getMonth() + 1 //Month from 0 to 11
    var y = date.getFullYear()
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
  },

  dateToYMD2(date) {
    var d = date.getDate()
    var m = date.getMonth() + 1 //Month from 0 to 11
    var y = date.getFullYear()
    return '' + y + (m <= 9 ? '0' + m : m) + (d <= 9 ? '0' + d : d)
  },

  keysToLowerCase(obj) {
    var keys = Object.keys(obj)
    var n = keys.length
    var i = 0
    while (i < n) {
      var key = keys[i] // "cache" it, for less lookups to the array
      obj[key.toLowerCase()] = obj[key] // swap the value to a new lower case key
      delete obj[key] // delete the old key
      i++
    }
    return (obj)
  },

  arrayKeysToLowerCase(obj) {
    var n = obj.length
    var i = 0
    while (i < n) {
      obj[i] = this.keysToLowerCase(obj[i])
      i++
    }
    return (obj)
  },

  extractItem(obj, item){
    for (let colum in obj){
      if(colum == item){
        delete obj[item]
      }
    }
    return obj
  },

  extractDbConn(dataConn){

    let dborcl= {
      user: decodeString(dataConn.iterations?? 0,dataConn.dbuser),
      password: decodeString(dataConn.iterations?? 0,dataConn.dbpassword),
      connectString: dataConn.dbhost+':'+dataConn.dbport+'/'+dataConn.dbsid,
    }
    return dborcl
  },

  validateDbConn(dataConn, error){
    if (process.env.DBCONN)
      return true
    
    let errorCount = 0
    if(!dataConn?.dbuser){
      error.push('No dbUser especified')
      errorCount++
    }

    if(!dataConn?.dbpassword){
      error.push('No dbPassword especified')
      errorCount++
    }

    if(!dataConn?.dbhost){
      error.push('No dbHost especified')
      errorCount++
    }

    if(!dataConn?.dbport){
      error.push('No dbPort especified')
      errorCount++
    }

    if(!dataConn?.dbsid){
      error.push('No dbSid especified')
      errorCount++
    }

    if(errorCount){
      return false
    }
        
    return true
  },

  convertDateCam(obj){
    for (let colum in obj){
      if ((typeof obj[colum] === 'string') && (obj[colum].substring(0,2) == '20') && (parseInt(obj[colum].substring(4,6),10) <= 12) && (parseInt(obj[colum].substring(6,8),10) <= 31)){
        obj[colum] = `TO_DATE('${this.jsonDateCam(obj[colum])},'YYYY-MM-DD')`
      }
    }
    return obj
  },

  paginationString(sql, connection, where) {
    //Se agrega en esta función el orderby
    const orderby = where.orderby || 'N'
    const pags = where.pags || 'N'

    if (orderby !== 'N'){
      sql += ` ORDER BY ${orderby}`
    }
        
    if (pags === 'S'){
      const offset = Number(where.offset || 0)
      const numrows = Number(where.numrows || 10)
            
      if (connection.oracleServerVersion >= 1201000000) { //Para versiones mayores a 12.01
        sql += ` OFFSET ${offset} ROWS FETCH NEXT ${numrows} ROWS ONLY`
      } else {
        sql = `SELECT * FROM (SELECT A.*, ROWNUM AS MY_RNUM FROM ( ${sql} ) A 
                        WHERE ROWNUM <= ${numrows} + ${offset}) WHERE MY_RNUM > ${offset}`
      }
    }
    return sql
  },
  
}

