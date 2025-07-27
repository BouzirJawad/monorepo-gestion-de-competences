const axios = require("axios");

const createBrief = async (req, res) => {
  const { title, description, context, skillCodes } = req.body;

  try {
    const skillCheck = await axios.get(`${process.env.SKILLS_URL}/api/skills/list`);
    const availableCodes = skillCheck.data.skills.map((s) => s.code);

    const validSkills = skillCodes.filter((code) =>
      availableCodes.includes(code)
    );
    if (validSkills.length !== skillCodes.length) {
      return res.status(400).json({ message: "Some skill codes are invalid" });
    }

    const resp = await axios.post(
      `${process.env.BRIEFS_URL}/api/briefs/create`,
      {
        title,
        description,
        context,
        skillCodes: validSkills,
      }
    );
    res.status(resp.status).json(resp.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message || "Error from brief microservice",
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBrief = async (req, res) => {
    const { briefId } = req.params;
  try {
    const briefRes = await axios.get(
      `${process.env.BRIEFS_URL}/api/briefs/brief/${briefId}`
    );
    const brief = briefRes.data;
    
    const skillsRes = await axios.get(`${process.env.SKILLS_URL}/api/skills/list`);
    const allskills = skillsRes.data.skills;
    const fullSkills = brief.skillCodes.map(code => allskills.find(skill => skill.code === code))

    res.status(200).json({
      ...brief,
      skills: fullSkills,
      skillCodes: undefined,
    });

  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message || "Error fetching data",
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBrief, getBrief };
