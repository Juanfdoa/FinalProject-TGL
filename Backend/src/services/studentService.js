const sequelize = require('../database/sequalize')
const student = require('../database/models/student')

async function getStudents() {
  const students = await student.findAll()
  return students
}

async function getStudentByDocument(documentNumber) {
  try {
    const getStudent = await student.findOne({
      where: {
        documentNumber: documentNumber
      }
    });

    if (!getStudent) {
      const error = new Error('The student does not exist');
      error.statusCode = 404;
      throw error;
    }

    return getStudent;
  } catch (error) {
    console.error('There was an error:', error);
    throw error;
  }
}

async function insertStudent(name, surname, documentNumber, telephone) {
    try {
      const newStudent = await student.create({
        name,
        surname,
        documentNumber,
        telephone
      });
      return newStudent;
    } 
    catch (error) {
      console.error('There was an error: ', error);
    }
  }

  async function updateStudent(id, name, surname, documentNumber, telephone) {
    try {
      const studentToUpdate = await student.findByPk(id);
  
      if (!studentToUpdate) {
        const error = new Error('The student does not exist');
        error.statusCode = 404;
        throw error;
      }
  
      await studentToUpdate.update({
        name,
        surname,
        documentNumber,
        telephone,
      });
  
      return studentToUpdate;
    } catch (error) {
      console.error('There was an error:', error);
      throw error;
    }
  }

  async function deleteStudent(id) {
    try {
        const studentToDelete = await student.findByPk(id)

        if (!studentToDelete) {
          const error = new Error('The student does not exist');
          error.statusCode = 404;
          throw error;
        }

        await studentToDelete.destroy();
        return studentToDelete; 
    } catch (error) {
        console.error('There was an error:', error);
        throw error; 
    }
}
  
module.exports = {
    getStudents,
    getStudentByDocument,
    insertStudent,
    updateStudent,
    deleteStudent
}
