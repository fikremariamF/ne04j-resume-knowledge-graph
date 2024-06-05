const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

const runQueries = async () => {
  try {
    const skillsDuringEducation = await session.run(`
      MATCH (e:Education)-[:LEARNED]->(s:Skill)
      RETURN e.school AS School, s.name AS Skill
    `);
    console.log(
      "Skills acquired during education:",
      skillsDuringEducation.records.map((record) => record.get("Skill"))
    );

    const jobsWithSkill = await session.run(
      `
      MATCH (e:Experience)-[:USED]->(s:Skill {name: $skill})
      RETURN e.company AS Company, e.role AS Role
    `,
      { skill: "Laravel" }
    );
    console.log(
      "Jobs with Laravel skill:",
      jobsWithSkill.records.map((record) => record.get("Company"))
    );
  } finally {
    await session.close();
  }
};

runQueries()
  .then(() => console.log("Done"))
  .catch((error) => console.error("Error:", error))
  .finally(() => driver.close());
