const notFound = (req, res, next) => {
    res.status(404).json({
        status: "Fail",
        messagge: "Beccati sta pagina vuota"
    })
}

module.exports = notFound;