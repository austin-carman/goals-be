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
  }

  next();
};

const validateNewSteps = (req, res, next) => {
  const { steps } = req.body;
  if (!steps) {
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
  const { goal_title, goal_completed } = req.body;
  const { goal_id } = req.params;
  if ((goal_title || goal_completed) && goal_id === undefined) {
    res.json({
      status: 404,
      message:
        "goal_id is required to make edits to goal_title and goal_completed.",
    });
  } else if (
    goal_id != undefined &&
    goal_title === undefined &&
    goal_completed === undefined
  ) {
    res.json({
      status: 200,
      message:
        "Must include editable properties with goal_id (ie: goal_title or goal_completed).",
    });
  } else if (
    goal_title != undefined &&
    (typeof goal_title != "string" || goal_title === "")
  ) {
    res.json({
      status: 404,
      message: "goal_title must be a non-empty string.",
    });
  } else if (
    goal_completed != undefined &&
    typeof goal_completed != "boolean"
  ) {
    res.json({
      status: 404,
      message: "goal_completed must be a boolean.",
    });
  }

  next();
};

const validateEditSteps = (req, res, next) => {
  if (req.body.steps === undefined) {
    return next();
  } else if (!Array.isArray(req.body.steps)) {
    res.json({
      status: 400,
      message: "steps must be array of step object(s).",
    });
  }

  req.body.steps.map((step) => {
    if (
      (step.step_title != undefined ||
        step.step_notes != undefined ||
        step.step_completed != undefined) &&
      step.step_id === undefined
    ) {
      res.json({
        status: 404,
        message:
          "step_id is required to make edits to step_title, step_notes, step_completed.",
      });
    } else if (
      step.step_id != undefined &&
      step.step_title === undefined &&
      step.step_notes === undefined &&
      step.step_completed === undefined
    ) {
      res.json({
        status: 400,
        message:
          "Must include editable property to edit step(s) (ie: step_title, step_notes, step_completed).",
      });
    } else if (
      step.step_title != undefined &&
      (typeof step.step_title != "string" || step.step_title === "")
    ) {
      res.json({
        status: 404,
        message: "step_title must be a non-empty string.",
      });
    } else if (
      step.step_notes != undefined &&
      (typeof step.step_notes != "string" || step.step_notes === "")
    ) {
      res.json({
        status: 404,
        message: "step_notes must be a non-empty string.",
      });
    } else if (
      step.step_completed != undefined &&
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

module.exports = {
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateNewSteps,
  validateEditGoal,
  validateEditSteps,
};
