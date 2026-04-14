import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { SettingsService } from './settings/settings.service';
import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly appService;
    private readonly productsService;
    private readonly settingsService;
    private readonly usersService;
    constructor(appService: AppService, productsService: ProductsService, settingsService: SettingsService, usersService: UsersService);
    getHello(): string;
    getStats(): Promise<{
        totalProducts: number;
        settingsUpdated: number;
        totalUsers: number;
    }>;
}
