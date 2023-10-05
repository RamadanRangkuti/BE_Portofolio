const db = require('../../helpers/connection')
const authModel = {
  login: (email) => {
    // console.log('Email:', email)
    // console.log('Password:', password)
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM profile WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  }
}

module.exports = authModel
