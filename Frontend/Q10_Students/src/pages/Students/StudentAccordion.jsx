import React, { useState } from 'react';
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StudentRatesTable from './Rates/StudentRatesTable';
import { handleSearch, handleDelete, handleAdd } from '../../actions/rate';

export default function StudentAccordion({ data, handleDelete: deleteStudentAction, refreshStudents }) {

  const [studentRates, setStudentRates] = useState({});
  const [expanded, setExpanded] = useState(null);

  const getStudentRates = async (id) => {
    try {
      const response = await handleSearch(id);
      setStudentRates(prev => ({
        ...prev,
        [id]: response
      }));
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
  };

  const deleteRate = async (id, studentId) => {
    try {
      await handleDelete(id);
      getStudentRates(studentId);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const addRate = async (studentId, subject, rate, notes) => {
    try {
      await handleAdd(studentId, subject, rate, notes);
      getStudentRates(studentId);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteStudentAction(id);
      await refreshStudents();
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const handleChange = (id) => (_, isExpanded) => {
    setExpanded(isExpanded ? id : null);

    if (isExpanded && !studentRates[id]) {
      getStudentRates(id);
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>

      {data?.map((row) => (
        <Accordion
          key={row.id}
          data-cy="student-row"
          expanded={expanded === row.id}
          onChange={handleChange(row.id)}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            '&:before': { display: 'none' }
          }}
        >
          {/* HEADER */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>

            <Box display="flex" alignItems="center" gap={2}>

              <Avatar sx={{ bgcolor: '#2563eb' }}>
                {row.name?.charAt(0)}
              </Avatar>

              <Box>
                <Typography fontWeight="bold">
                  {row.name} {row.surname}
                </Typography>

                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  {row.documentNumber}
                </Typography>
              </Box>

            </Box>

          </AccordionSummary>

          {/* CONTENT */}
          <AccordionDetails>

            <StudentRatesTable
              studentId={row.id}
              data={studentRates[row.id] || []}
              deleteRate={(rateId) => deleteRate(rateId, row.id)}
              AddRate={addRate}
            />

            <Box mt={2} textAlign="right">
              <Button
                onClick={() => deleteStudent(row.id)}
                data-cy="button-delete-student"
                startIcon={<DeleteIcon />}
                sx={{
                  textTransform: 'none',
                  color: '#ef4444',
                  '&:hover': {
                    backgroundColor: '#fee2e2'
                  }
                }}
              >
                Eliminar estudiante
              </Button>
            </Box>

          </AccordionDetails>
        </Accordion>
      ))}

    </Box>
  );
}