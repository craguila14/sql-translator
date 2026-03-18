import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { TRANSLATOR_PROMPT } from './prompts/translator.prompt';

@Injectable()
export class QueriesService implements OnModuleInit {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('IA_API_KEY');
     if (!apiKey) {
      throw new Error('IA_API_KEY no configurada en el archivo .env');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
  }

  async translateAndExecute(question: string) {
    const ahora = new Date();
    const diaSemana = ahora.toLocaleDateString('es-ES', { weekday: 'long' });
    const fechaActual = ahora.toLocaleDateString('es-ES');

    const prompt = TRANSLATOR_PROMPT(diaSemana, fechaActual, question);

    const generatedSql = await this.getSqlFromAI(prompt);

    try {
      const result = await this.dataSource.query(generatedSql);
      
      return {
        pregunta: question,
        sql: generatedSql,
        data: result,
      };
    } catch (error) {
      return {
        error: 'La IA generó un SQL que la base de datos no pudo ejecutar.',
        sqlIntentado: generatedSql,
        detalles: error.message,
      };
    }
  }

  private async getSqlFromAI(fullPrompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/```sql|```/g, '').trim();
      
      return text;
    } catch (error) {
      throw new Error('Error al conectar con el servicio de IA: ' + error.message);
    }
  }

async getTableData(tableName: string) {
  const allowedTables = ['productos', 'clientes', 'ventas'];
  
  if (!allowedTables.includes(tableName)) {
    throw new Error('Tabla no permitida');
  }

  try {
    const data = await this.dataSource.query(`SELECT * FROM ${tableName} LIMIT 20`);
    return data;
  } catch (error) {
    throw new Error(`Error al obtener datos de la tabla ${tableName}`);
  }
}
}