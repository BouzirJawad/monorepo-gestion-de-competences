module.exports = {
  // SKILLS MICROSERVICE
  "/api/skills/create": ["admin"],
  "/api/skills/list": ["student", "teacher", "admin"],
  "/api/skills/skill/:code": ["student", "teacher", "admin"],
  "/api/skills/skill/update/:skillId": ["admin"],
  "/api/skills/skill/delete/:skillId": ["admin"],

  // BRIEFS MICROSERVICE
  "/api/briefs/create": ["teacher", "admin"],
  "/api/briefs/list": ["student", "teacher", "admin"],
  "/api/briefs/brief/:briefId": ["student", "teacher", "admin"],
  "/api/briefs/brief/update/:briefId": ["admin", "teacher"],
  "/api/briefs/brief/delete/:briefId": ["admin", "teacher"],

  // STUDENTS MICROSERVICE 
  "/api/students/student/:userId/create": ["admin"],
  "/api/students/list": ["teacher", "admin"],
  "/api/students/student/:studentId": ["admin", "teacher"],
  "/api/students/student/:studentId/brief/:briefId/submit": ["student", "teacher", "admin"],
  "/api/students/student/:studentId/brief/:briefId/assign-brief": ["teacher", "admin"],
  "/api/students/student/:studentId/brief/:briefId/skill/:skillCode/subskill/:subSkillTitle/validate": ["teacher", "admin"],

  // USERS MICROSERVICE
  "/api/users/user/:userId": ["student", "teacher", "admin"],
  "/api/users/user/delete/:userId": ["admin"],
};
