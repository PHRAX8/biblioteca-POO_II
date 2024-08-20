const jwt = require('jsonwebtoken');
require('dotenv').config();

const BEARER_PREFIX = 'Bearer ';
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Obtém o header de autorização
    const authHeader = req.headers['authorization'];

    // Verifica se o header de autorização está presente e começa com 'Bearer '
    if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
        return res.status(401).json({ message: 'Autorização negada: Header inválido' });
    }

    // Extrai o token do header
    const token = authHeader.substring(BEARER_PREFIX.length);

    try {
        // Decodifica e verifica o token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Adiciona o usuário decodificado ao request
        req.user = decoded;

        // Passa para o próximo middleware ou rota
        next();
    } catch (error) {
        // Retorna um erro de autorização se o token for inválido
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;
