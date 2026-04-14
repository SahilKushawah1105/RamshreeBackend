"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const settings_service_1 = require("../settings/settings.service");
let ChatbotService = class ChatbotService {
    configService;
    settingsService;
    baseUrl;
    model;
    constructor(configService, settingsService) {
        this.configService = configService;
        this.settingsService = settingsService;
        this.baseUrl = this.configService.get('OLLAMA_BASE_URL') || 'http://localhost:11434';
        this.model = this.configService.get('OLLAMA_MODEL') || 'llama3.2:1b';
    }
    async getAIResponse(userMessage, history = []) {
        try {
            const settings = await this.settingsService.findAll();
            const systemInstruction = settings.chatbot_instructions || 'You are a helpful assistant for Ramshree International.';
            const chatbotEnabled = settings.chatbot_enabled === 'true';
            if (!chatbotEnabled) {
                return { message: 'Chatbot is currently disabled.' };
            }
            const messages = [
                { role: 'system', content: systemInstruction },
                ...history,
                { role: 'user', content: userMessage },
            ];
            const response = await axios_1.default.post(`${this.baseUrl}/api/chat`, {
                model: this.model,
                messages: messages,
                stream: false,
            });
            return {
                message: response.data.message.content,
            };
        }
        catch (error) {
            console.error('Ollama Error:', error.message);
            throw new common_1.InternalServerErrorException('Failed to get response from AI provider.');
        }
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        settings_service_1.SettingsService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map