const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
// const { CreateChannel } = require('./utils');
// const { initRedis } = require('./config/redis');

const StartServer = async () => {

    const app = express();
    // await initRedis()
    await databaseConnection();
    await expressApp(app);

    // const channel = await CreateChannel()
    const channel = 0

    await expressApp(app, channel);
    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
        // .on('close', () => {
        //     channel.close();
        // })

}
StartServer();
