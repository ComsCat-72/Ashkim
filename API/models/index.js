const User = require('./User');
const Group = require('./Group');
const Message = require('./Message');

User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(Message);
Message.belongsTo(User, { as: 'sender' });

module.exports = { User, Group, Message };
