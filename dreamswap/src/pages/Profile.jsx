import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Profile(){
  const [form, setForm] = useState({ nombre:'', email:'', rem:'', prefs:[] });
  const togglePref = (val) =>
    setForm(f => ({ ...f, prefs: f.prefs.includes(val) ? f.prefs.filter(p=>p!==val) : [...f.prefs, val] }));

  const onSubmit = (e)=>{ e.preventDefault(); console.log('Perfil guardado', form); };

  return (
    <>
      <h1 className="h3">Mi Perfil</h1>
      <Form className="vstack gap-3" onSubmit={onSubmit}>
        <Form.Group><Form.Label>Nombre</Form.Label>
          <Form.Control value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
        </Form.Group>
        <Form.Group><Form.Label>Email</Form.Label>
          <Form.Control type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </Form.Group>
        <Form.Group><Form.Label>ID Onírica</Form.Label>
          <Form.Control value={form.rem} onChange={e=>setForm({...form, rem:e.target.value})} />
        </Form.Group>
        <div>
          <Form.Check label="Sueños suaves" onChange={()=>togglePref('suave')} checked={form.prefs.includes('suave')} />
          <Form.Check label="Finales épicos" onChange={()=>togglePref('epico')} checked={form.prefs.includes('epico')} />
          <Form.Check label="Control lúcido" onChange={()=>togglePref('lucido')} checked={form.prefs.includes('lucido')} />
        </div>
        <Button type="submit" variant="light">Guardar</Button>
      </Form>
    </>
  );
}