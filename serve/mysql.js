const mysql = require('mysql')

const query = (sql, params, callback) => {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        dateStrings: true,
        database: 'blog'
    })
    conn.connect(err => {
        if (err)
            throw err
    })
    conn.query(sql, params, (err, results) => {
        if (err)
            throw err
        callback(results)
        conn.end(err => {
            if (err)
                throw err
        })
    })
}
module.exports = query