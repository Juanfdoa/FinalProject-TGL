const Joi = require('joi');
const studentService = require('../services/studentService')
const {createShema, updateShema} = require('../schemas/studentShema')

const getStudents= async (req, res) => {
    try {
        const students = await studentService.getStudents()
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudent= async (req, res) => {
    try 
    {
        const schema = Joi.object({
            documentNumber: Joi.required()
        });

        const { error } = schema.validate({ documentNumber: req.params.documentNumber });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const document = req.params.documentNumber;
        console.log(document)
        const student = await studentService.getStudentByDocument(document)
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const { error } = createShema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, surname, documentNumber, telephone} = req.body;
        const student = await studentService.insertStudent(name, surname, documentNumber, telephone)

        if (!student) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { error } = updateShema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {id, name, surname, documentNumber, telephone} = req.body;
        const student = await studentService.updateStudent(id, name, surname, documentNumber, telephone)

        if (!student) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try
    {
        const schema = Joi.object({
            id: Joi.required()
        });

        const { error } = schema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = req.params.id;
        const studentDeleted = await studentService.deleteStudent(id)

        if (!studentDeleted) {
            return res.status(404).json({ error: 'Student was not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}