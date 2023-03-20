const error500 = (error, res) => {
  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
};

module.exports = {
  error500,
};
