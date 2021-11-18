const Goals = require("../models/goals-model");
const Users = require("../models/user-model");

const validateUserId = (req, res, next) => {
  const { user_id } = req.params;
  Users.findUserBy({ user_id })
    .then((user) => {
      if (user === undefined) {
        res.json({
          status: 400,
          message: `Could not find user with id, ${user_id}.`,
        });
      } else {
        next();
      }
    })
    .catch((err) => next(err));
};

const validateGoalId = (req, res, next) => {
  const { goal_id } = req.params;
  Goals.getGoal(goal_id)
    .then((goal) => {
      if (goal === undefined) {
        res.json({
          status: 404,
          message: `Could not find goal with id, ${goal_id}.`,
        });
      } else {
        next();
      }
    })
    .catch((err) => next(err));
};

const validateStepId = (req, res, next) => {
  const { step_id } = req.params;
  Goals.getStep(step_id)
    .then((step) => {
      if (step === undefined) {
        res.json({
          status: 404,
          message: `Could not find step with id, ${step_id}.`,
        });
      } else {
        next();
      }
    })
    .catch((err) => next(err));
};

const validateNewGoal = (req, res, next) => {
  if (!req.body.goal_title || typeof req.body.goal_title != "string") {
    res.json({
      status: 404,
      message: "goal_title is required and must be a string.",
    });
  } else {
    next();
  }
};

const validateNewSteps = (req, res, next) => {
  const { steps } = req.body;
  if (steps === []) {
    return next();
  } else if (!Array.isArray(steps)) {
    res.json({
      status: 400,
      message: "steps must be array of step objects.",
    });
  }
  steps.map((step) => {
    if (!step.step_title) {
      res.json({
        status: 404,
        message:
          "step_title is required in step object and must be a non-empty string.",
      });
    } else if (
      step.step_completed !== undefined &&
      typeof step.step_completed != "boolean"
    ) {
      res.json({
        status: 404,
        message: "step_completed must be a boolean.",
      });
    }
  });
  next();
};

const validateEditGoal = (req, res, next) => {
  const { user_id, goal_title, goal_completed } = req.body;
  const { goal_id } = req.params;
  if (!goal_id) {
    res.status(400).json({
      message: "goal_id parameter is required to edit goal.",
    });
  } else if (!goal_title || goal_completed === undefined || !user_id) {
    res.status(400).json({
      message: "goal_title, goal_completed, user_id are required.",
    });
  } else if (typeof goal_title !== "string" || goal_title === "") {
    res.status(400).json({
      message: "goal_title must be a non-empty string.",
    });
  } else if (typeof goal_completed !== "boolean") {
    res.status(400).json({
      message: "goal_completed must be a boolean.",
    });
  } else if (typeof user_id !== "number") {
    res.status(400).json({
      message: "user_id must be a number.",
    });
  }

  next();
};

const validateEditSteps = (req, res, next) => {
  const { steps } = req.body;
  if (!steps || !Array.isArray(steps)) {
    res.status(400).json({
      message: "steps is required and must be of type array.",
    });
  }

  steps.map((step) => {
    // what to do about step_id??? -> skip for now
    const { step_title, step_notes, step_completed } = step;
    if (
      !step_title ||
      step_notes === undefined ||
      step_completed === undefined
    ) {
      res.status(404).json({
        message:
          "step_title, step_notes, step_completed are required. However, step_notes may have null value ",
      });
    } else if (typeof step_title !== "string" || step_title === "") {
      res.status(404).json({
        message: "step_title must be a non-empty string.",
      });
    } else if (step_notes !== null && typeof step_notes !== "string") {
      res.status(404).json({
        message: "step_notes must be of type string.",
      });
    } else if (typeof step_completed != "boolean") {
      res.status(404).json({
        message: "step_completed must be a boolean.",
      });
    }
  });

  next();
};

module.exports = {
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateNewSteps,
  validateEditGoal,
  validateEditSteps,
};
