import formidable from 'formidable';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send('Error');
    await fetch('YOUR_WEBHOOK_URL', {
      method: 'POST',
      body: JSON.stringify({
        cvFile: files.cvFile ? files.cvFile.filepath : '',
        jobDesc: fields.jobDesc,
        phoneNumber: fields.phoneNumber,
      }),
    });
    res.status(200).send('Processing started - check your email!');
  });
}
