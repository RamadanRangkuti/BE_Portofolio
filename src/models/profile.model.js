/* eslint-disable camelcase */
const db = require('../../helpers/connection')
const profileModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM profile', (err, result) => {
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
      db.query('SELECT * FROM profile WHERE id_profile = $1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  },
  add: ({ id_profile, name, email, password, picture, description }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO profile (id_profile, name, email, password, picture, description) VALUES($1,$2,$3,$4,$5,$6)', [id_profile, name, email, password, picture, description], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({ id_profile, name, email, password, picture, description })
        }
      })
    })
  },
  update: ({ id, name, email, password, picture, description }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE profile SET name=$1, email=$2, password=$3, picture=$4, description=$5 WHERE id_profile= $6', [name, email, password, picture, description, id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({ id, name, email, password, picture, description })
        }
      })
    })
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(' DELETE FROM profile WHERE id_profile=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = profileModel
