import { execSync } from "child_process";
const ldFlags = execSync("ld flags list --json").toString();
const flags = JSON.parse(ldFlags);
flags.forEach(f => {
  if (f.archived || f.environments.production.on === false) {
    console.warn(`Flag ${f.key} is archived or off in prod.`);
  }
});
