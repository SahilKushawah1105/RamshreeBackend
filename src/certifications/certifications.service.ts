import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private certificationsRepository: Repository<Certification>,
  ) {}

  private deleteFile(filePath: string) {
    if (!filePath || !filePath.startsWith('/uploads/')) return;

    const fileName = filePath.replace('/uploads/', '');
    const fullPath = path.join(process.cwd(), 'uploads', fileName);

    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log(`Deleted file: ${fullPath}`);
      } catch (err) {
        console.error(`Failed to delete file: ${fullPath}`, err);
      }
    }
  }

  async create(createCertificationDto: CreateCertificationDto): Promise<Certification> {
    const certification = this.certificationsRepository.create(createCertificationDto);
    return this.certificationsRepository.save(certification);
  }

  async findAll(): Promise<Certification[]> {
    return this.certificationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Certification> {
    const certification = await this.certificationsRepository.findOne({ where: { id } });
    if (!certification) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }
    return certification;
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDto): Promise<Certification> {
    const existing = await this.findOne(id);

    // Cleanup if icon is changing
    if (updateCertificationDto.icon && existing.icon && updateCertificationDto.icon !== existing.icon) {
      this.deleteFile(existing.icon);
    }

    await this.certificationsRepository.update(id, updateCertificationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.findOne(id);

    // Cleanup icon on remove
    if (existing.icon) {
      this.deleteFile(existing.icon);
    }

    const result = await this.certificationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Certification with ID ${id} not found`);
    }
  }
}
