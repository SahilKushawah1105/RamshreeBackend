"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_entity_1 = require("./entities/blog.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let BlogsService = class BlogsService {
    constructor(blogsRepository) {
        this.blogsRepository = blogsRepository;
    }
    deleteFile(filePath) {
        if (!filePath || !filePath.startsWith('/uploads/'))
            return;
        const fileName = filePath.replace('/uploads/', '');
        const fullPath = path.join(process.cwd(), 'uploads', fileName);
        if (fs.existsSync(fullPath)) {
            try {
                fs.unlinkSync(fullPath);
                console.log(`Deleted file: ${fullPath}`);
            }
            catch (err) {
                console.error(`Failed to delete file: ${fullPath}`, err);
            }
        }
    }
    async create(createBlogDto) {
        const blog = this.blogsRepository.create(createBlogDto);
        return this.blogsRepository.save(blog);
    }
    async findAll() {
        return this.blogsRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const blog = await this.blogsRepository.findOne({ where: { id } });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        return blog;
    }
    async update(id, updateBlogDto) {
        const existing = await this.findOne(id);
        if (updateBlogDto.image && existing.image && updateBlogDto.image !== existing.image) {
            this.deleteFile(existing.image);
        }
        await this.blogsRepository.update(id, updateBlogDto);
        return this.findOne(id);
    }
    async remove(id) {
        const existing = await this.findOne(id);
        if (existing.image) {
            this.deleteFile(existing.image);
        }
        const result = await this.blogsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
    }
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map