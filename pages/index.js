export default function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>CV Generator</h1>
      <form action="/api/process" method="POST" encType="multipart/form-data">
        <div>
          <label>Upload CV (PDF, DOCX, TXT):</label><br />
          <input type="file" name="cvFile" accept=".pdf,.docx,.txt" />
        </div>
        <div>
          <label>Job Description:</label><br />
          <textarea name="jobDesc" rows="5" style={{ width: '100%' }}></textarea>
        </div>
        <div>
          <label>Phone Number (for Payment):</label><br />
          <input type="tel" name="phoneNumber" placeholder="+254..." />
        </div>
        <button type="submit">Generate CV</button>
      </form>
    </div>
  );
}
