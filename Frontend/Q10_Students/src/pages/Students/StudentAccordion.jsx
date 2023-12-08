import React, { useState, useEffect } from 'react';
import { handleSearch, handleDelete, handleAdd } from '../../actions/rate';
import StudentRatesTable from './Rates/StudentRatesTable';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function StudentAccordion({data}) {
const [studentRate, setStudentRate] = useState([]);
const [studentId, setStudentId] = useState(null);

const getStudentRates = async (id) => {
    try {
      const response = await handleSearch(id)
      setStudentRate(response);
    } catch (error) {
      console.error('Error en la solicitud:', error.response.data);
    }
  };

  const deleteRate = async (id) => {
    try {
      await handleDelete(id);
      getStudentRates(studentId);
    } catch (error) {
      console.error('Error al eliminar la nota:', error.response.data);
    }
  };

  const AddRate = async (studentId,subject, rate, notes) => {
    try {
      await handleAdd(studentId,subject,rate,notes);
      getStudentRates(studentId);
    } catch (error) {
      console.error('Error insertar nota', error.response.data);
    }
  };

  const handleAccordionExpand = (id) => {
    setStudentId(id);
    if (id !== null) {
      handleSearch(id);
    }
  };

  useEffect(() => {
    if (studentId !== null) {
      getStudentRates(studentId);
    }
  }, [studentId]); 

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '0 auto', width: '70%' }}>
        {data.map((row) => (
            <Accordion key={row.id} onChange={() => handleAccordionExpand(row.id)} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={row.id} id={row.id}>
                    <Typography>{row.documentNumber + " - " + row.name + " " + row.surname  }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StudentRatesTable studentId={row.id} data={studentRate} deleteRate={deleteRate} AddRate={AddRate}/>
                </AccordionDetails>
            </Accordion>
        ))}
    </Box>
  );
}
