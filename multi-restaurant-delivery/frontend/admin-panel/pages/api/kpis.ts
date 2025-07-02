import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.KPI_DB_URL });

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const { rows } = await pool.query('SELECT period, total_revenue FROM kpis.monthly_summary ORDER BY period');
  res.status(200).json(rows);
};
