import * as fs from "fs";

export default {
  config,
};

function config() {
  const envFilePath = __dirname + "/../../.env";
  if (fs.existsSync(envFilePath)) {
    const fileContent = fs.readFileSync(envFilePath, "utf8");
    const arrEnv = fileContent.split("\n");
    const parsed = arrEnv.map((envVar) => envVar.split("="));
    for (const env of parsed) {
      process.env[env[0]] = env[1];
    }
  }
}
