const yargs = require("yargs");
//Special utility in yargs to read the parameters of the commands
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const {commitRepo} = require("./controllers/commit");
const {pushRepo} = require("./controllers/push");
const {pullRepo} = require("./controllers/pull");
const {revertRepo} = require("./controllers/revert");

// To read the input from terminal
yargs(hideBin(process.argv))
  .command("init", "Initialises a new git repository", {}, initRepo)
  .command("add <file>", "Add a new file to staging area", (yargs)=>{
    yargs.positional("file",{
      describe:"File to be added to staging area",
      type:"string"
    })
  }, (argv) =>{
    addRepo(argv.file)
  })
  .command("commit <message>","Commit the changes",(yargs)=>{
    yargs.positional("message",{
      describe:"Provide message for the commit being made",
      type:"string"
    })
  },commitRepo)
  .command("push","Push the changes to S3",{},pushRepo)
  .command("pull","Pull changes from S3",{},pullRepo)
  .command("revert <commitID>","Reverts to specific commit",(yargs)=>{
    yargs.positional("commitID",{
      describe:"Commit ID to revert to",
      type:"string"
    })
  },revertRepo)
  .demandCommand(1, "You need aleast one command as argument")
  .help().argv;
  
  

