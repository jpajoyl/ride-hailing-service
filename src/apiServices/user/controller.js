const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "ok",
    data: [],
  });
};
module.exports = {
  getAllUsers,
};
