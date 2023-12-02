const sequelize = require('../database/sequalize')
const rates = require('../database/models/rates')

async function getRateByStudent(studentId) {
  const allRates = await rates.findAll({
    where:{
        studentId: studentId
    }
  })
  return allRates
}

async function insertRate(studentId, subject, rate, notes) {
    try {
      const newRate = await rates.create({
        studentId,
        subject,
        rate,
        notes
      });
      return newRate;
    } 
    catch (error) {
      console.error('There was an error: ', error);
    }
  }

  async function updateRate(id, studentId, subject, rate, notes) {
    try {
      const rateToUpdate = await rates.findByPk(id);
  
      if (!rateToUpdate) {
        const error = new Error('Rate does not exist');
        error.statusCode = 404;
        throw error;
      }
  
      await rateToUpdate.update({
       studentId,
       subject,
       rate,
       notes
      });
  
      return rateToUpdate;
    } catch (error) {
      console.error('There was an error:', error);
      throw error;
    }
  }

  async function deleteRate(id) {
    try {
        const rateToDelete = await rates.findByPk(id)

        if (!rateToDelete) {
          const error = new Error('Rate does not exist');
          error.statusCode = 404;
          throw error;
        }

        await rateToDelete.destroy();
        return rateToDelete; 
    } catch (error) {
        console.error('There was an error:', error);
        throw error; 
    }
}
  
module.exports = {
    getRateByStudent,
    insertRate,
    updateRate,
    deleteRate
}
