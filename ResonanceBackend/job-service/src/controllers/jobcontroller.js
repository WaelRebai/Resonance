const pool = require('../config/database');

// GET /jobs - List all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /jobs - Create job (Recruiter only)
exports.createJob = async (req, res) => {
  try {
    const { title, description, skills, salary, location } = req.body;
    
    const result = await pool.query(
      'INSERT INTO jobs (title, description, skills, salary, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, skills, salary, location]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /jobs/:id - Get single job
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /jobs/:id - Update job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, skills, salary, location } = req.body;
    
    const result = await pool.query(
      'UPDATE jobs SET title = $1, description = $2, skills = $3, salary = $4, location = $5 WHERE id = $6 RETURNING *',
      [title, description, skills, salary, location, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /jobs/:id - Delete job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};