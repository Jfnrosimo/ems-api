// import User from "./models/users.js";

// export const authenticateWithToken = (request, response, next) => {
//   const authHeader = request.get("Authorization");
//   if (authHeader) {
//     console.log(authHeader,"header")
//     const match = authHeader.match(/^(Token|Bearer) (.+)/i);
//     if (match) {
//       console.log(match,"match")
//       const token =  match[2];
//       console.log(token,"token")
//      User.findOne({ token }).exec()
//         .then((user) => {
//           request.user = user;
//           next();
//         })
//         .catch((err) => {
//           next(err);
//         });
//       return;
//     }
//   }

//   next();
// };

// export const requireUser = (request, response,next) => {
//   if (!request.user) {
//     response.status(401).json({ error: "You don't have access to this resource" });
//     return;
//   }

//   next();
// };
