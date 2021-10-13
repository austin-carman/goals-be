const Goals = require("../models/goals-model");

const restricted = (req, res, next) => {

};
// check that user_id exists, check that user_id matches user_id of logged in user
const validateUserId =  (req, res, next) => {

};

const validateGoalId =  async (req, res, next) => {
  const { goal_id } = req.params;
  try {
    const goal = await Goals.getGoal(goal_id);
    if (!goal || goal.length === 0) {
      res.json({
        status: 404,
        message: `Could not find goal with id, ${goal_id}`
      });
    } else {
      next();
    }
  }
  catch (err) {
    next(err);
  }
};

const validateStepId =  async (req, res, next) => {
  const { step_id } = req.params;
  try {
    const step = await Goals.getStep(step_id);
    if (!step || step.length === 0) {
      res.json({
        status: 404,
        message: `Could not find step with id, ${step_id}`
      });
    } else {
      next();
    }
  }
  catch (err) {
    next(err);
  }
};

const validateNewGoal = (req, res, next) => {
  if (!req.body.goal_title || typeof req.body.goal_title != "string") {
    res.json({
      status: 404,
      message: "goal_title is required and must be a string."
    });
  } else if (!req.body.steps) {
    return next();
  }

  req.body.steps.map(step => {
    if (!step.step_title || typeof step.step_title != "string") {
      res.json({
        status: 404,
        message: "step_title is required for creating steps, must be a string"
      });
    } else if (step.step_notes === "" || (step.step_notes && typeof step.step_notes != "string")) {
      res.json({
        status: 404,
        message: "step_notes must be a non-empty string"
      });
    } else if (step.step_completed && typeof step.step_completed != "boolean") {
      res.json({
        status: 404,
        message: "step_completed must be a boolean"
      });
    }
  });

  next();
};

const validateEditGoal = (req, res, next) => {
  const { goal_id, goal_title, goal_completed } = req.body;
  if ((goal_title || goal_completed) && !goal_id) {
    res.json({
      status: 404,
      message: "goal_id is required to make edits to goal_title and goal_completed"
    });
  } else if (goal_title && typeof goal_title != "string") {
    res.json({
      status: 404,
      message: "goal_title must be a string"
    });
  } else if (goal_completed && typeof goal_title != "boolean") {
    res.json({
      status: 404,
      message: "goal_completed must be a boolean"
    });
  }

  next();
};

const validateEditSteps = (req, res, next) => {
  const { step_id, step_title, step_notes, step_completed } = req.body;
  if ((step_title || step_notes || step_completed) && !step_id) {
    res.json({
      status: 404,
      message: "step_id is required to make edits to step_title, step_notes, and step_completed"
    });
  } else if (
    (
      step_title || step_notes) && typeof (step_title || step_notes
    ) != "string") {
    res.json({
      status: 404,
      message: "step_title and step_notes must be a string"
    });
  } else if (step_completed && typeof step_completed != "boolean") {
    res.json({
      status: 404,
      message: "step_completed must be a boolean"
    });
  }
};

module.exports = {
  restricted,
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateEditGoal,
  validateEditSteps
};
