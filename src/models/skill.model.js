/* eslint-disable camelcase */
const db = require('../../helpers/connection')
const skillModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM skills', (err, result) => {
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
      db.query('SELECT * FROM skills WHERE id_skill = $1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  },
  add: ({ id_skill, skill_name, skill_level }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO skills(id_skill, skill_name, skill_level) VALUES($1,$2,$3)', [id_skill, skill_name, skill_level], (err, result) => {
        if (err) {
          console.error('Error in database query:', err)
          reject(err.message)
        } else {
          resolve({ id_skill, skill_name, skill_level })
        }
      })
    })
  },
  update: ({ id, skill_name, skill_level }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE skills SET skill_name=$1, skill_level=$2 WHERE id_skill=$3', [skill_name, skill_level, id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({ id, skill_name, skill_level })
        }
      })
    })
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM skills WHERE id_skill=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = skillModel
