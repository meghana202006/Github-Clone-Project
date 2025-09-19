const fs = require('fs').promises;
const path = require('path');
const dbx = require('../config/dbx-config');
const { readdir } = require('fs');

async function pushRepo()
{
    const repoPath = path.resolve(process.cwd(),".apnaGit");
    const commitsPath = path.join(repoPath,"commits");
    try{
        const commitsDir = await fs.readdir(commitsPath);
        for(let commitDir of commitsDir)
        {
            console.log(commitDir);
            const commitPath = path.join(commitsPath,commitDir)
            const files = await fs.readdir(commitPath);
            for(let file of files)
            {
                const filePath = path.join(commitPath,file);
                const fileContent = await fs.readFile(filePath);
                const params = {
                    path:`/commits/${commitDir}/${file}`,
                    contents:fileContent,
                    mode: { '.tag': 'overwrite' }
                }

                await dbx.filesUpload(params);
            }
        }
        console.log("All commits saved to dropbox succesfully");
    }catch(err)
    {
        console.log("Error pushing files to dropbox",err);
    }
}

module.exports = {pushRepo};