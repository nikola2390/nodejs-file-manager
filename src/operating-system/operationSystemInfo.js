import { homedir, EOL, userInfo, arch, cpus } from "node:os";

export const operationSystemInfo = (command) => {
  switch (command) {
    case "eol":
      console.log(EOL);
      break;
    case "cpus":
      const processors = [];

      cpus().forEach((cpu) => {
        const model = cpu.model;
        const clockrate = `${cpu.speed / 1000}GHz`;
        processors.push({ model, clockrate });
      });

      console.table(processors);
      break;
    case "homedir":
      console.log(homedir());
      break;
    case "username":
      console.log(userInfo().username);
      break;
    case "architecture":
      console.log(arch());
      break;
    default:
      console.log("Invalid input");
      break;
  }
};
