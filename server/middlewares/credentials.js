const credentials = (req, res, next) => {
    const origin = req.headers.origin
    // console.log(origin, 'origin')
    // if (origin === 'http://127.0.0.1:5173') {
    //     console.log('inside')
    //     req.setHeader('Access-Control-Allow-Credentials', true)
    // }
    //
    // console.log(origin === 'http://127.0.0.1:5173')
    // console.log(req.headers, 'req')
    console.log(origin, 'origin')
    next()
}

module.exports = credentials
