import ac from '../middleware/ac.js';

const checkPermission = (action, resource) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming the user's role is on the request object
    const permission = ac.can(userRole)[action](resource);

    if (permission.granted) {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
};

export default checkPermission;