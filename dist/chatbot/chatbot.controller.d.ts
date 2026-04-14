import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    query(body: {
        message: string;
        history?: {
            role: string;
            content: string;
        }[];
    }): Promise<{
        message: any;
    }>;
}
