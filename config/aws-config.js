const yargs = require('yargs');
// Special utility to read the arguments of the commands
const {hideBin} = require('yargs/helpers');

yargs(hideBin(process.argv)).command("init","Initialises a new git repository");

