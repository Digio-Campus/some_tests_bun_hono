// Función para obtener el nombre de usuario a partir de las cookies
function getUsernameFromCookies(cookies: string): string {
    const pairs = cookies.split(';');
    for (let i = 0; i < pairs.length; i++) {
        const parts = pairs[i].split('=');
        if (parts[0].trim() === 'username') {
            return parts[1];
        }
    }
    return '';
}

// Configuración del servidor
const server = Bun.serve<{ username: string }>({
    fetch(req, server) {
        const cookies = req.headers.get("cookie") || "";
        const username = getUsernameFromCookies(cookies);
        const success = server.upgrade(req, {data: {username}});
        if (success) return undefined;

        return new Response("Hello world");
    },
    websocket: {
        open(ws) {
            // Cuando se abre un websocket, enviamos un mensaje de bienvenida
            const msg = `${ws.data.username} has entered the chat`;
            ws.subscribe("the-group-chat");
            server.publish("the-group-chat", msg);
        },
        message(ws, message) {
            // Cuando recibimos un mensaje, lo retransmitimos a todos
            server.publish("the-group-chat", `${ws.data.username}: ${message}`);
        },
        close(ws) {
            // Cuando se cierra un websocket, enviamos un mensaje de despedida
            const msg = `${ws.data.username} has left the chat`;
            server.publish("the-group-chat", msg);
            ws.unsubscribe("the-group-chat");
        },
    },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
