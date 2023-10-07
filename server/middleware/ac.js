import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac.grant('user')
  .createOwn('company')  // Can create a company (and automatically becomes its admin)
  .readOwn('company');   // Can read the company they belong to

ac.grant('admin')
  .extend('user')       // Inherits user permissions
  .updateOwn('company') // Can update their own company
  .deleteOwn('company'); // Can delete their own company

  ac.grant('superAdmin')
  .createAny('company')
  .readAny('company')
  .updateAny('company')
  .deleteAny('company')
  // ... Add permissions for other resources similarly


export default ac;
