import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { parse } from 'yaml';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { resume_name } = req.query;

      if (!resume_name) {
        return res.status(400).json({ error: 'resume_name query parameter is required' });
      }

      const filePath = path.join(process.cwd(), `${resume_name}.yml`);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = parse(fileContents);

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error loading resume:', error);
      return res.status(500).json({ error: 'Failed to load resume' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
