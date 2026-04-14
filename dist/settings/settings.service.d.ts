import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<Setting>);
    findAll(): Promise<Record<string, string>>;
    update(name: string, value: string): Promise<Setting>;
    updateMany(settings: Record<string, string>): Promise<void>;
}
