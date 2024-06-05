const neo4j = require("neo4j-driver");
const fs = require("fs");

const initialData = JSON.parse(fs.readFileSync("initial_data.txt", "utf8"));

const driver = neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

const createNodesAndRelationships = async () => {
  try {
    await session.run("MATCH (n) DETACH DELETE n");

    for (const education of initialData.Education) {
      await session.run(
        `CREATE (e:Education {school: $school, degree: $degree, startDate: $startDate, endDate: $endDate})`,
        education
      );
    }

    for (const skill of initialData.Skills) {
      await session.run(`CREATE (s:Skill {name: $name})`, skill);
    }

    for (const experience of initialData.Experience) {
      await session.run(
        `CREATE (e:Experience {company: $company, role: $role, startDate: $startDate, endDate: $endDate, location: $location, project: $project})`,
        experience
      );
    }

    for (const project of initialData.Projects) {
      await session.run(
        `CREATE (p:Project {name: $name, description: $description})`,
        project
      );
    }

    for (const achievement of initialData.Achievements) {
      await session.run(`CREATE (a:Achievement {description: $description})`, {
        description: achievement,
      });
    }

    for (const association of initialData.Associations) {
      await session.run(`CREATE (a:Association {name: $name})`, association);
    }

    await session.run(
      `CREATE (c:Contact {email: $email, phone: $phone, location: $location, github: $github, linkedin: $linkedin})`,
      initialData.Contact
    );

    console.log("Nodes and relationships created successfully");
  } finally {
    await session.close();
  }
};

createNodesAndRelationships()
  .then(() => console.log("Done"))
  .catch((error) => console.error("Error:", error))
  .finally(() => driver.close());
