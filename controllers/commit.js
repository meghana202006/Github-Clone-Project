const fs = require("fs").promises;
const path = require("path");
// returns an object of all version by destructing only v4 and renaming it as uuidv4
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  // Path to copy all files from staging repo
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");
  try {
    const commitID = uuidv4();
    // To create a commitDir with unique commitID
    const commitDir = path.join(commitPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    //Copying files from staging directory
    // Lists of files to be added
    const files = await fs.readdir(stagedPath);
    console.log(files);
    for (let file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file)
      );
    }
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() })
    );
    console.log(`Commit ${commitID} created with the message:${message}`);
  } catch (err) {
    console.error("Error while commiting files:", err);
  }
}

module.exports = { commitRepo };
