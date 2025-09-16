// To handle file operations
const fs = require('fs').promises;
// To find the path of directories
const path = require('path');



async function initRepo()
{   // repoPath is the path of the git folder being add to
    const repoPath = path.resolve(process.cwd(),".apnaGit");
    // commitsPath is the path of commits folder
    const commitsPath = path.join(repoPath,"commits");
    try
    {
        await fs.mkdir(repoPath,{recursive:true});
        await fs.mkdir(commitsPath,{recursive:true});
        await fs.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket:process.env.S3_BUCKET})
        )
        console.log("Repository initialized successfully");
    }catch(err)
    {
        console.log("Error in initializing the repository",err);
    }
}

module.exports = {initRepo};