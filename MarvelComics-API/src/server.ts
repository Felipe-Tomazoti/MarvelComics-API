import app from "./app";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

function main() {
    app.listen({
        host: typeof HOST === 'string' ? HOST : '0.0.0.0',
        port: typeof PORT === 'string' ? Number(PORT) : 3333
    }).then(() => {
        if (process.env.NODE_ENV != 'test') console.log(`Server is running on http://${HOST}:${PORT}`);
    })
}

main();

export const server = app;