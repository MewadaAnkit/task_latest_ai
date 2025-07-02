const fs = require('fs').promises;
const path = './data/users.json';

exports.getUsers = async () => {
  try {
    const data = await fs.readFile(path, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

exports.saveUsers = async (users) => {
  await fs.writeFile(path, JSON.stringify(users, null, 2));
};
