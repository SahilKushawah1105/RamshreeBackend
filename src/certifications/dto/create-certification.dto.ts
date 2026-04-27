import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCertificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
