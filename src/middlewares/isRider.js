const User = require("../apiServices/user/model");

async function isRider(req, res, next) {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(404).json({
        data: "Usuario no encontrado",
        status: 404,
      });
    }
    if (user.role === "rider") {
      req.body.user = user;
      return next();
    }
    return res.status(401).json({
      data: "No tienes permisos para ejecutar esta acción",
      status: 401,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({
      data: "Error en el servidor",
      status: 500,
    });
  }
}

module.exports = isRider;
