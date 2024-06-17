const express = require('express');
const { PORT, SERVICE } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
// const { CreateChannel } = require('./utils');

const StartServer = async () => {

    const app = express();

    await databaseConnection();

    // const channel = await CreateChannel()
    const channel = 0
    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}, ${SERVICE}`);
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
