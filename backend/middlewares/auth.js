const jwt = require('jsonwebtoken')
const JWT_SECRET = "hfdsah984yth3ofnw9fyhfh984yt93h98wy98shfdvsdfyg8s7ghfuibvaiuv9"

const verifyToken = (req, res, next) => {
	const header = req.header('Authorization')
	const token = header && header.split(' ')[1]

	if (!token) {
		return res.status(401).json({ success: false, msg: 'User token not found' })
    }
	try {
		const decrypted = jwt.verify(token, JWT_SECRET)
		req.customerID = decrypted.customerID
		next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, msg: 'Invalid token' })
	}
}

module.exports = verifyToken