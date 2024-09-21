const Group = require('../models/Group');
const Message = require('../models/Message');

exports.createGroup = async (req, res) => {
  try {
    const { partnerId } = req.body;
    const group = new Group({ members: [req.userId, partnerId] });
    await group.save();
    res.status(201).json({ groupId: group._id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ group: groupId }).sort('createdAt');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { content, messageType } = req.body;
    const message = new Message({
      group: groupId,
      sender: req.userId,
      content,
      messageType
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
