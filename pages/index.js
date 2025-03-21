import { useState } from 'react';

export default function Home() {
  const [cvFile, setCvFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cvFile', cvFile);
    formData.append('jobDesc', jobDesc);
    formData.append('phoneNumber', phoneNumber);

    const response = await fetch('/api/process', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    alert('CV Generated! Check your email or pay to download.');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>CV Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload CV (PDF, DOCX, TXT):</label><br />
          <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setCvFile(e.target.files[0])} />
        </div>
        <div>
          <label>Job Description:</label><br />
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            rows="5"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Phone Number (for Payment):</label><br />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+254..."
          />
        </div>
        <button type="submit">Generate CV</button>
      </form>
    </div>
  );
}
