import ac from '../middleware/ac.js';

const checkPermission = (action, resource) => {
  return (req, res, next) => {
    // console.log('Checking permissions for:', req.user); 
    
    const userRole = req.user ? req.user.role : null;
    if(!userRole) {
        return res.status(401).send('Unauthorized');
    }

    const permission = ac.can(userRole)[action](resource);

    if (permission.granted) {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
};

export default checkPermission; 