import formidable from 'formidable';
import { google } from 'googleapis';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send('Error parsing form');

    try {
      // Set up Google Drive
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      const drive = google.drive({ version: 'v3', auth });

      // Upload the file to Google Drive
      const fileMetadata = {
        name: `CV-${fields.phoneNumber}.pdf`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      };
      const media = {
        mimeType: files.cvFile.mimetype,
        body: fs.createReadStream(files.cvFile.filepath),
      };
      const uploadedFile = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id, webViewLink',
      });

      // Make the file publicly accessible
      await drive.permissions.create({
        fileId: uploadedFile.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      // Send the file URL to Zapier
      await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvFileUrl: uploadedFile.data.webViewLink,
          jobDesc: fields.jobDesc,
          phoneNumber: fields.phoneNumber,
        }),
      });

      res.status(200).send('Processing started - check your email!');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error processing request');
    }
  });
}
