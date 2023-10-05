/* eslint-disable camelcase */
const db = require('../../helpers/connection')
const experienceModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM experiences', (err, result) => {
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
      db.query('SELECT * FROM experiences WHERE id_experience = $1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  },
  add: ({ id_experience, project_name, project_description, star, end_date, link_deploy, link_repo }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO experiences(id_experience, project_name, project_description, star, end_date, link_deploy, link_repo) VALUES($1,$2,$3,$4,$5,$6,$7)', [id_experience, project_name, project_description, star, end_date, link_deploy, link_repo], (err, result) => {
        if (err) {
          console.error('Error in database query:', err)
          reject(err.message)
        } else {
          resolve({ id_experience, project_name, project_description, star, end_date, link_deploy, link_repo })
        }
      })
    })
  },
  update: ({ id, project_name, project_description, star, end_date, link_deploy, link_repo }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE experiences SET project_name=$1, project_description=$2, star=$3, end_date=$4, link_deploy=$5, link_repo=$6 WHERE id_experience=$7', [project_name, project_description, star, end_date, link_deploy, link_repo, id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve({ id, project_name, project_description, star, end_date, link_deploy, link_repo })
        }
      })
    })
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM experiences WHERE id_experience=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = experienceModel
