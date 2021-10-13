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
  } else if (req.body.steps === undefined) {
    next();
  }

  req.body.steps.map(step => {
    if (!step.step_title || typeof step.step_title != "string") {
      res.json({
        status: 404,
        message: "step_title is required for creating steps, must be a string"
      });
    } else if (step.step_notes && typeof step.step_notes != "string") {
      res.json({
        status: 404,
        message: "step_notes must be a string"
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

// check that req.body has all required, optionals are correct format
const validateEditGoal = (req, res, next) => {

};

module.exports = {
  restricted,
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateEditGoal,
};
