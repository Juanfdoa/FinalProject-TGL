const sequelize = require('../database/sequalize')
const subject = require('../database/models/subject')

async function getSubjects() {
  const subjects = await subject.findAll()
  return subjects
}

async function insertSubject(name, teacher) {
    try {
      const newSubject = await subject.create({
        name,
        teacher
      });
      return newSubject;
    } 
    catch (error) {
      console.error('There was an error: ', error);
    }
  }

  async function updateSubject(id, name, teacher) {
    try {
      const subjectToUpdate = await subject.findByPk(id);
  
      if (!subjectToUpdate) {
        const error = new Error('Subject does not exist');
        error.statusCode = 404;
        throw error;
      }
  
      await subjectToUpdate.update({
        name,
        teacher
      });
  
      return subjectToUpdate;
    } catch (error) {
      console.error('There was an error:', error);
      throw error;
    }
  }

  async function deleteSubject(id) {
    try {
        const subjectToDelete = await subject.findByPk(id)

        if (!subjectToDelete) {
          const error = new Error('Subject does not exist');
          error.statusCode = 404;
          throw error;
        }

        await subjectToDelete.destroy();
        return subjectToDelete; 

    } catch (error) {
        console.error('There was an error:', error);
        throw error; 
    }
}
  
module.exports = {
    getSubjects,
    insertSubject,
    updateSubject,
    deleteSubject
}
