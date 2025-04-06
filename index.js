
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gender: '',
    city: '',
    origin: '',
    fatherName: '',
    motherName: '',
    grandfatherName: '',
    grandmotherName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    checkFamilyMatch(form);
  };

  const checkFamilyMatch = (data) => {
    const knownNames = ['אסרסה', 'מלקמו', 'טקלה', 'וובלה'];
    let matchFound = false;
    let matchedNames = [];

    Object.values(data).forEach((value) => {
      if (knownNames.includes(value)) {
        matchFound = true;
        matchedNames.push(value);
      }
    });

    if (matchFound) {
      setMatchResult({
        match: true,
        degree: 3,
        names: matchedNames
      });
    } else {
      setMatchResult({ match: false });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>שידוכי ביתא ישראל</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          {[
            ['שם מלא', 'fullName'],
            ['גיל', 'age'],
            ['מגדר (זכר / נקבה)', 'gender'],
            ['עיר מגורים', 'city'],
            ['מוצא (גונדר / תיגראי / אחר)', 'origin'],
            ['שם האב', 'fatherName'],
            ['שם האם', 'motherName'],
            ['שם סב מצד אב', 'grandfatherName'],
            ['שם סבתא מצד אם', 'grandmotherName']
          ].map(([label, name]) => (
            <div key={name}>
              <label>{label}</label>
              <input name={name} value={form[name]} onChange={handleChange} required />
            </div>
          ))}
          <button type="submit">שלח לבדיקה</button>
        </form>
      ) : matchResult ? (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {matchResult.match ? (
            <>
              <p style={{ color: 'red' }}>נמצאה קרבה משפחתית בדרגה {matchResult.degree}!</p>
              <p>השמות שזוהו בקירבה: {matchResult.names.join(', ')}</p>
            </>
          ) : (
            <p style={{ color: 'green' }}>לא נמצאה קרבה משפחתית ישירה. ניתן להמשיך בתהליך ההיכרות.</p>
          )}
          <button onClick={() => setSubmitted(false)}>בדיקה מחדש</button>
        </div>
      ) : null}
    </div>
  );
}
