import pkg from 'enquirer';
import Executor from './executor.js';
const { prompt, Select, Toggle } = pkg;

const run = async () => {
    const backend_select = new Select({
        name: 'backend_framework',
        message: 'Pick a Backend Framework',
        choices: ['None', 'Express.js']
      });

      const backend = await backend_select.run()
      const backend_typescript = new Toggle({
        message: 'Do you want it in typescript?',
        enabled: 'Yep',
        disabled: 'Nope'
      });
      const backend_in_typescript = await backend_typescript.run(); 
      const executor = new Executor(backend, backend_in_typescript);
      await executor.init();
}

run()