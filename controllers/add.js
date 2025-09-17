const fs = require('fs').promises;
const path = require('path');

async function addRepo(filePath)
{
    const repoPath = path.resolve(process.cwd(),".apnaGit");
    const stagingPath = path.join(repoPath,"staging");
    async function exists()
    {
        try{
            await fs.access(stagingPath);
            return true;
        }catch
        {
            return false;
        }
    }
    try{
        if(exists())
        {
            
            await fs.mkdir(stagingPath,{recursive:true});
        }
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath,path.join(stagingPath,fileName));
        console.log(`File ${fileName} is added to staging area`);
    }catch(err)
    {
        console.error("Error while adding file to staging area",err)
    }
}

module.exports = {addRepo};