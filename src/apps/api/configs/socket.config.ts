import { Server } from 'http';
import io from 'socket.io';

const socketEvents = {
    createProduct: 'CREATE_PRODUCT',
    productCreated: 'PRODUCT_CREATED',

    updateProduct: 'UPDATE_PRODUCT',
    productUpdated: 'PRODUCT_UPDATED',

    deleteProduct: 'DELETE_PRODUCT',
    productDeleted: 'PRODUCT_DELETED',
};

export function configureSocket(server: Server) {
    new io.Server(server, {
        path: '/events',
    }).on('connection', async client => {
        console.log(`Client connected: ${client.id}`);

        client.on(socketEvents.createProduct, data => {
            console.log(data);
        });

        client.on(socketEvents.updateProduct, data => {
            console.log(data);
        });

        client.on(socketEvents.deleteProduct, data => {
            console.log(data);
        });

        client.on('disconnect', () => {
            console.log(`Client disconnected: ${client.id}`);
        });
    });
}
