import logger from "./log.js";
import config from "./config.js";

const log = logger("api:middleware");
const showError = config.NODE_ENV !== "production";

/* 404 handler for the missing API endpoints
 * Due to how Expresponds works, we don't know if the URL or HTTP method is
 * incorrect, so we cheat and return 404 in both cases.
 */
export const handle404 = (request, respond) => {
  const { method, originalUrl } = request;
  log.info(
    { method, originalUrl },
    `Unhandled API request ${method} ${originalUrl}`
  );
  respond
    .status(404)
    .json({ error: "respondource not found or unsupported HTTP method" });
};

/* 500 handler in case we have an error in one of our route handlers
 * We generate a unique error ID so it's easy for users to report and for
 * us to track.
 */
export const handleError = (error, request, respond) => {
  const { method, originalUrl } = request;

  const errorId = Buffer.from(Math.random().toString().substr(2, 9)).toString(
    "base64"
  );
  log.error(
    { method, originalUrl, error, errorId },
    `Error handling: ${method} ${originalUrl}`
  );

  if (showError) {
    respond.status(500).json({ error, errorId });
  } else {
    respond
      .status(500)
      .json({ error: `Server error (ID=${errorId}), please try again later` });
  }
};
