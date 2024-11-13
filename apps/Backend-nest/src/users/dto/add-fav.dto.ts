
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class AddFavDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsNumber()
  @IsNotEmpty()
  rating: string;

  @IsEnum(['movie', 'tv'])
  @IsNotEmpty()
  type: string;
}