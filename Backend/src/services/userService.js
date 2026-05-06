const User = require('../database/models/user')
const crypto = require('crypto');

async function getUsers() {
    const users = await User.findAll()
    return users
}

async function insertUser(email, password) {
    try {
        const hash = crypto.createHash('sha256');
        hash.update(password); 
        const hashedPassword = hash.digest('hex');
        
      const newUser= await User.create({
        email,
        password: hashedPassword
      });
      return newUser;
    } 
    catch (error) {
      console.error('There was an error: ', error);
    }
  }

  async function deleteUser(id) {
    try {
        const userToDelete = await User.findOne({
            where: {
                id: id
            }
        });

        if (!userToDelete) {
            const error = new Error('User does not exist');
            error.statusCode = 404;
            throw error;
        }

        await userToDelete.destroy();
        return userToDelete; 
    } catch (error) {
        console.error('There was an error:', error);
        throw error; 
    }
}

async function login(email, password) {
  try {
      const user = await User.findOne({
          where: {
              email,
          }
      });

      if (!user) {
        const error = new Error('Invalid Credentials');
        error.statusCode = 401;
        throw error;
      }


      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');

      if (hashedPassword !== user.password) {
        const error = new Error('Invalid Credentials');
        error.statusCode = 401;
        throw error;
      }

      return user;
  } catch (error) {
      throw new Error(error.message);
  }
}
  
module.exports = {
    getUsers,
    insertUser,
    deleteUser, 
    login
}
