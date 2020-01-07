module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET,
        tokens: {
            access: {
                type: "access",
                expiresIn: '2m'
            },
            refresh: {
                type: "refresh",
                expiresIn: '3m'
            }
        }
    }
}