import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ModalUpdateSubject from './ModalUpdateSubject';
import '../../../style.css';

export default function SubjectCard({ data, deleteSubject, UpdateSubject }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [subjectEdit, setSubjectEdit] = useState({
    id:'',
    name:'',
    teacher:''
  });

  const handleDelete = (id) => {
    deleteSubject(id);
  };

  const catchSubject = (id,name,teacher)=>{
    setSubjectEdit({
        id,
        name,
        teacher
    });
    openModal()
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '0 30px' }}>
      {data &&
        data.map((row) => (
          <Card key={row.id} sx={{ width: 200, margin: '0 5px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={()=> catchSubject(row.id,row.name,row.teacher)} size="small" startIcon={<CreateIcon />} sx={{ marginLeft: 'auto' }} />
              <Button onClick={() => handleDelete(row.id)} size="small" startIcon={<DeleteIcon />} sx={{ marginLeft: 'auto' }} />
            </div>
            <CardContent>
              <h3>{row.name}</h3>
              <p className='text'>{row.teacher}</p>
            </CardContent>
          </Card>
        ))}
        {modalOpen ? 
            (<ModalUpdateSubject subjectEdit={subjectEdit} open={modalOpen} handleClose={closeModal} UpdateSubject={UpdateSubject} /> )
        :
            (null)
        }
        
    </Box>
  );
}
