import { ConfigService } from '@nestjs/config';
import { SettingsService } from '../settings/settings.service';
export declare class ChatbotService {
    private configService;
    private settingsService;
    private readonly baseUrl;
    private readonly model;
    constructor(configService: ConfigService, settingsService: SettingsService);
    getAIResponse(userMessage: string, history?: {
        role: string;
        content: string;
    }[]): Promise<{
        message: any;
    }>;
}
