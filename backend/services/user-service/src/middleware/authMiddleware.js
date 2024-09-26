const jwt = require('jsonwebtoken');

// Middleware d'authentification
exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Accès interdit. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Ajouter les informations de l'utilisateur au req pour un usage ultérieur
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

// Middleware pour vérifier si l'utilisateur est un admin
exports.verifyAdmin = (req, res, next) => {
  // L'utilisateur doit être authentifié, donc req.user devrait être disponible
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas administrateur.' });
  }

  next();  // Si l'utilisateur est admin, on continue
};
