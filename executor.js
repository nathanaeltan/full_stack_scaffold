import shell from 'shelljs';
import fs from 'fs';
import ora from 'ora';
import {EXPRESS_SERVER_FILE_CODE, EXPRESS_APP_FILE_CODE} from './templates/express_templates.js';

class Executor {
  constructor(framework, typescript) {
    this.framework = framework;
    this.typescript = typescript;
    this.extension_type = typescript ? ".ts" : ".js";
    this.spinner = ora('Loading Project');
  }
  async init() {
    await this._initialize_and_generate_file_structure();
    this._generate_server_file_code();
    this._generate_app_file_code();
  }
  async _initialize_and_generate_file_structure() {
    this.spinner.start();
    shell.echo(`Creating a ${this.framework} project`);
    shell.exec("mkdir backend");
    shell.cd("backend");
    shell.exec("npm init -y > /dev/null 2>&1");
    shell.exec("npm install express mongoose > /dev/null 2>&1");
    shell.exec("tsc --init > /dev/null 2>&1");
    shell.mkdir("src");
    if (this.typescript) {
      await shell.exec(
        "npm install --save-dev @types/express nodemon ts-node typescript", {async:true}
      );
      shell.touch("./src/server.ts");
    } else {
      await shell.exec("npm install --save-dev nodemon", {async:true});
      shell.touch("./src/server.js");
    }
    const file_path = `./package.json`;
    const packageJSON = JSON.parse(fs.readFileSync(file_path, 'utf8'));

    packageJSON.scripts = {
      "start": `node src/server${this.extension_type}`,
      "dev": `nodemon --watch src --exec node src/server${this.extension_type}`,
      "test": "jest"
    };
    fs.writeFileSync(file_path, JSON.stringify(packageJSON, null, 2));
    shell.cd('src');
    shell.mkdir('controllers');
    shell.mkdir('models');
    shell.mkdir('routes');
    shell.mkdir('services');
    shell.cd('..')
  }

  _generate_server_file_code() {
    const code_content = EXPRESS_SERVER_FILE_CODE;
    const file_path = `./src/server${this.extension_type}`;
    fs.writeFileSync(file_path, code_content);
    shell.ShellString(code_content).to(file_path);
  }

  _generate_app_file_code() {
    const code_content = EXPRESS_APP_FILE_CODE;
    const file_path = `./src/app${this.extension_type}`;
    fs.writeFileSync(file_path, code_content);
    shell.ShellString(code_content).to(file_path);
    this.spinner.succeed('Successfully Generated Express Project');
  }
}

export default Executor;


