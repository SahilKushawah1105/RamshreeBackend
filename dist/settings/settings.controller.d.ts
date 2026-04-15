/// <reference types="multer" />
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<Record<string, string>>;
    updateMany(settings: Record<string, string>): Promise<void>;
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
}
