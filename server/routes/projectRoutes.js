import express from 'express';
import { runDevSprintPipeline, runPMAgentOnly, runRemainingPipeline } from '../agents/orchestrator.js';
import { protect } from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

/**
 * @route   POST /api/projects/generate
 */
router.post('/generate', protect, async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid prompt string.' });
  }

  try {
    const pipelineResult = await runDevSprintPipeline(prompt, null, model);

    let savedProject = null;
    try {
      savedProject = await Project.create({
        user: req.user ? req.user._id : null,
        title: pipelineResult.artifacts.prd?.projectTitle || 'Software Blueprint',
        prompt,
        artifacts: pipelineResult.artifacts,
        modelUsed: model || process.env.OLLAMA_MODEL || 'qwen2.5:1.5b'
      });
    } catch (dbErr) {
      console.warn('⚠️ Could not save project to MongoDB:', dbErr.message);
    }

    return res.json({
      success: true,
      projectId: savedProject ? savedProject._id : null,
      data: pipelineResult
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/projects/generate-pm
 */
router.post('/generate-pm', protect, async (req, res) => {
  const { prompt, model } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid prompt string.' });
  }

  try {
    const prdData = await runPMAgentOnly(prompt, model);
    return res.json({ success: true, prd: prdData });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/projects/generate-remaining
 */
router.post('/generate-remaining', protect, async (req, res) => {
  const { prd, prompt, model } = req.body;

  if (!prd) {
    return res.status(400).json({ error: 'Please provide valid PRD object.' });
  }

  try {
    const pipelineResult = await runRemainingPipeline(prd, prompt || '', model);

    let savedProject = null;
    try {
      savedProject = await Project.create({
        user: req.user ? req.user._id : null,
        title: prd.projectTitle || 'Refined Blueprint',
        prompt: prompt || prd.summary,
        artifacts: pipelineResult.artifacts,
        modelUsed: model || process.env.OLLAMA_MODEL || 'qwen2.5:1.5b'
      });
    } catch (dbErr) {
      console.warn('⚠️ Could not save project to MongoDB:', dbErr.message);
    }

    return res.json({
      success: true,
      projectId: savedProject ? savedProject._id : null,
      data: pipelineResult
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/projects/my-blueprints
 */
router.get('/my-blueprints', protect, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Please login to view saved blueprints.' });
  }

  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
