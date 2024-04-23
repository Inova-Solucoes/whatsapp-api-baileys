import {MessageQueueInterface} from "../../../application/abstractions/messageQueue";
import * as amqp from 'amqplib';
import {AppError, HttpCode} from "../../../domain/exceptions/app-error";
export class AMQPMessageQueue implements MessageQueueInterface {
    private readonly connectionUrl: string;
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;
    constructor(connectionUrl: string) {
        this.connectionUrl = connectionUrl;
    }

    async connect(): Promise<void> {
        this.connection = await amqp.connect(this.connectionUrl);
        this.channel = await this.connection.createChannel();
    }

    async sendMessage(queueName: string, message: any): Promise<void> {
        if (!this.channel) {
            throw new AppError({
                message: 'The connection has not been established. Call connect() before sending messages.',
                isOperational: true,
                statusCode: HttpCode['NOT_FOUND']
            })
        }
        await this.channel.assertQueue(queueName);
        this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    }

    async receiveMessage(queueName: string, callback: (message: any) => void): Promise<void> {
        if (!this.channel) {
            throw new AppError({
                message: 'The connection has not been established. Call connect() before sending messages.',
                isOperational: true,
                statusCode: HttpCode['NOT_FOUND']
            })
        }

        await this.channel.assertQueue(queueName);
        await this.channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const content = msg.content.toString();
                callback(JSON.parse(content));
                this.channel?.ack(msg);
            }
        });
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
        }
    }
}