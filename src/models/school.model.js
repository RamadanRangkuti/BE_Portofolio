/* eslint-disable camelcase */
const db = require('../../helpers/connection')
const schoolModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM school', (err, result) => {
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
      db.query('SELECT * FROM school WHERE id_school = $1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  },
  add: ({ id_school, school_city, category, grade, major, school_name }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO school(id_school, school_city, category, grade, major, school_name) VALUES($1,$2,$3,$4,$5,$6)', [id_school, school_city, category, grade, major, school_name], (err, result) => {
        if (err) {
          console.error('Error in database query:', err)
          reject(err.message)
        } else {
          resolve({ id_school, school_city, category, grade, major, school_name })
        }
      })
    })
  },
  update: ({ id, school_city, category, grade, major, school_name }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE school SET school_city=$1, category=$2, grade=$3, major=$4, school_name=$5 WHERE id_school=$6', [school_city, category, grade, major, school_name, id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({ id, school_city, category, grade, major, school_name })
        }
      })
    })
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM school WHERE id_school=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = schoolModel
