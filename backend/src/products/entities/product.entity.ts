import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, Min, IsUrl, IsBoolean } from 'class-validator';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  price: number;

  @Column({ type: 'varchar', nullable: true })
  @IsUrl()
  imageUrl: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
} 