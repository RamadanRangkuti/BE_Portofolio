/* eslint-disable camelcase */
const db = require('../../helpers/connection')
const technologyModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM experience_tech', (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows)
        }
      })
    })
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM experience_tech WHERE id_exptech = $1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  },
  add: ({ id_exptech, id_experience, techname }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO experience_tech(id_exptech, id_experience, techname) VALUES($1,$2,$3)', [id_exptech, id_experience, techname], (err, result) => {
        if (err) {
          console.error('Error in database query:', err)
          reject(err.message)
        } else {
          resolve({ id_exptech, id_experience, techname })
        }
      })
    })
  },
  update: ({ id, id_experience, techname }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE experience_tech SET id_experience=$1, techname=$2 WHERE id_exptech=$3', [id_experience, techname, id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({ id, id_experience, techname })
        }
      })
    })
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM experience_tech WHERE id_exptech=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = technologyModel
