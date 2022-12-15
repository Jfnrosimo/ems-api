import { Router } from "express";

import { authenticateWithToken } from "../auth.js";
import { handle404, handleError } from "../errors.js";
import authRouter from "./auth.js";
import answerRouter from "./answer.js";
import choicesRouter from "./choices.js";
import questionsRouter from "./questions.js";
import certificateRouter from "./certificate.js";
import examRouter from "./exam.js";
import usersRouter from "./users.js";
import typesRouter from "./types.js";
import sectionsRouter from "./sections.js";
import urls from "../urls.js";

const router = Router();

// Authentication
router.use(authenticateWithToken);
router.use(urls.apiPrefix + urls.auth.path, authRouter);

// CRUD API
router.use(urls.apiPrefix + urls.answer.path, answerRouter);
router.use(urls.apiPrefix + urls.choices.path, choicesRouter);
router.use(urls.apiPrefix + urls.questions.path, questionsRouter);
router.use(urls.apiPrefix + urls.certificate.path, certificateRouter);
router.use(urls.apiPrefix + urls.users.path, usersRouter);
router.use(urls.apiPrefix + urls.exams.path, examRouter);
router.use(urls.apiPrefix + urls.types.path, typesRouter);
router.use(urls.apiPrefix + urls.sections.path, sectionsRouter);

// Error handlers
router.use(handle404);
router.use(handleError);

export default router;
