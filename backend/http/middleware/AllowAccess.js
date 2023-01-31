const { AccessControl } = require('accesscontrol');

let grantArray = [
  { role: 'regular', resource: 'post', action: 'read:any', attributes: '*, !id' },
  { role: 'user', resource: 'post', action: 'read:own', attributes: '*' },
  { role: 'manager', resource: 'post', action: 'create:own', attributes: '*' },
  { role: 'manager', resource: 'post', action: 'update:own', attributes: '*' },
  { role: 'user', resource: 'post', action: 'delete:own', attributes: '*' },
  { role: 'Receptionist', resource: 'post', action: 'read:any', attributes: '*' },
  { role: 'Receptionist', resource: 'post', action: 'create:any', attributes: '*' },
  { role: 'Receptionist', resource: 'post', action: 'update:any', attributes: '*' },
  { role: 'Receptionist', resource: 'post', action: 'delete:any', attributes: '*' },
  { role: 'admin', resource: 'post', action: 'read:any', attributes: '*' },
  { role: 'admin', resource: 'post', action: 'create:any', attributes: '*' },
  { role: 'admin', resource: 'post', action: 'update:any', attributes: '*' },
  { role: 'admin', resource: 'post', action: 'delete:any', attributes: '*' }
]

const allowAccess = new AccessControl(grantArray);

module.exports = allowAccess;
