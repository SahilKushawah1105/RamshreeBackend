import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    private deleteFile;
    create(productData: Partial<Product>): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, productData: Partial<Product>): Promise<Product>;
    remove(id: number): Promise<void>;
}
