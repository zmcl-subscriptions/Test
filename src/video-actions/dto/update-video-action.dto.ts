import { PartialType } from '@nestjs/swagger';
import { CreateVideoActionDto } from './create-video-action.dto';

export class UpdateVideoActionDto extends PartialType(CreateVideoActionDto) {}
