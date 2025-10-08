import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext.jsx';

export default function Profile(){
  const { profile, updateProfile } = useProfile();
  const [form, setForm] = useState(profile);
  const [ok, setOk] = useState(false);

  const togglePref = (val) =>
    setForm(f => ({ ...f, prefs: f.prefs.includes(val) ? f.prefs.filter(p=>p!==val) : [...f.prefs, val] }));

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setOk(true); setTimeout(()=>setOk(false), 1800);
  };

  return (
    <>
      <h1 className="h3">Mi Perfil</h1>
      {ok && <Alert variant="success">Perfil guardado</Alert>}
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
