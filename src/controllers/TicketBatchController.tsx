const axios = require('axios');

// Função para obter os lotes através da requisição GET
const getLots = async (req: any, res: any) => {
  try {
    const response = await axios.get('http://localhost:3003/admin/lots');
    const lots = response.data;
    res.json(lots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter os lotes' });
  }
};

module.exports = {
  getLots,
};
