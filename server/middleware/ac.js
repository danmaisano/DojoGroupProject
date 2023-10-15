import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac.grant('user')
  .createOwn('company')  // Can create a company (and automatically becomes its admin)
  .readOwn('company')   // Can read the company they belong to
  .createOwn('opportunity')
  .createOwn('contact')
  .updateAny('contact')
  .deleteOwn('contact')
  .readAny('contact')
  .readAny('opportunity')
  .updateAny('opportunity')
  .deleteOwn('opportunity')

ac.grant('admin')
  .extend('user')        // Inherits user permissions
  .updateOwn('company')  // Can update their own company
  .deleteOwn('company')  // Can delete their own company
  .createAny('user')     // Can create a user (potentially an admin) within their company
  .updateAny('user')    // Can update a user within their company

ac.grant('superAdmin')
  .extend('admin')
  .createAny('company')
  .readAny('company')
  .updateAny('company')
  .deleteAny('company')
  .updateAny('user')
  .createAny('user');

export default ac;
