import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @MinLength(8)
  @Exclude()
  password: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  @IsPhoneNumber('FR')
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  @IsEnum(UserRole)
  role: UserRole = UserRole.CLIENT;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
} 