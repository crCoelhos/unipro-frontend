// const axios = require("axios");

// const url = process.env.REACT_APP_SERVER_URL;
// const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

// // Função para obter os lotes através da requisição GET
// const getLots = async (req: any, res: any) => {
//   try {
//     const response = await axios.get(`${url}admin/lots`);
//     const lots = response.data;
//     res.json(lots);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erro ao obter os lotes" });
//   }
// };

// module.exports = {
//   getLots,
// };
