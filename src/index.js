import dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import server from './server';

dotenv.config();

const { PORT } = process.env;

const cpus = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Master ${process.pid} is running...`);

  for (let i = 0; i < cpus; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`);

    cluster.fork();
  });
} else {
  server.listen(PORT, (error) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    console.log(`Worker ${process.pid} started.`);
  });
}
