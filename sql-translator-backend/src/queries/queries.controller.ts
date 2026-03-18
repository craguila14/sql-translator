import { Controller, Post, Body, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { CreateQueryDto } from './dto/create-query.dto';

@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post('translate')
  @HttpCode(HttpStatus.OK)
  async executeQuery(@Body() createQueryDto: CreateQueryDto) {
    const { question } = createQueryDto;
    
    return await this.queriesService.translateAndExecute(question);
  }

  @Get('table/:name')
  async getTable(@Param('name') name: string) {
  return await this.queriesService.getTableData(name);
}
}