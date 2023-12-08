import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../../style.css'

export default function SubjectCard({data, deleteSubject}) {
const handleDelete = (id) => {
    deleteSubject(id);
};

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin:'0 30px' }}>
        {data && data.map((row)=>(
        <Card key={row.id} sx={{ width:200, margin: '0 5px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <Button onClick={() => handleDelete(row.id)} size="small" startIcon={<DeleteIcon/>} sx={{ marginLeft: 'auto' }}/>
            </div>
            <CardContent>
                <h3>
                    {row.name}
                </h3>
                <p className='text'>
                    {row.teacher}
                </p>
                
            </CardContent>
        </Card>
    ))}
     </Box>
  );
}
