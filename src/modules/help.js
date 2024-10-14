export function help() {
  const helpText = `
Available commands:
  .exit                     Exit the program;

  Navigation & working directory (nwd)
    up                            Go upper from current directory
    cd path_to_directory          Go to dedicated folder from current directory
    ls                            Print in console list of all files and folders in current directory

  Operating system info
    os --EOL                      Get EOL (default system End-Of-Line) and print it to console
    os --cpus                     Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
    os --homedir                  Get home directory and print it to console
    os --username                 Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
    os --architecture             Get CPU architecture for which Node.js binary has compiled and print it to console

  Hash calculation
    hash path_to_file             Calculate hash for file and print it into console
`;

  console.log(helpText);
}
