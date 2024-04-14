import fs from 'fs';
import path from 'path';
import createDebug from 'debug';
import {
  type MothCreateDto,
  type Moth,
  type MothUpdateDto,
} from '../entities/moth';

import { fileURLToPath } from 'url';

const debug = createDebug('W6E:repository:moth');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line @typescript-eslint/naming-convention
const JSON_FILE_PATH = path.join(__dirname, 'moths.db.json');

// eslint-disable-next-line @typescript-eslint/naming-convention
const MOTHS: Moth[] = [];

export class MothMemoryRepository {
  moths = MOTHS;
  constructor() {
    debug('Instantiated moth memory repository');
    this.loadMoths();
    console.log(this.readAll());
  }

  loadMoths() {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
      this.moths = JSON.parse(data) as Moth[];
    } catch (err) {
      console.error('Error loading moths:', err);
      this.moths = [];
    }
  }

  saveMoths() {
    fs.writeFileSync(
      JSON_FILE_PATH,
      JSON.stringify(this.moths, null, 2),
      'utf8'
    );
  }

  readAll() {
    return this.moths;
  }

  readById(id: string) {
    return this.moths.find((moth) => moth.id === id);
  }

  create(data: MothCreateDto) {
    const newMoth: Moth = {
      id: (this.moths.length + 1).toString(),
      type: data.type,
      description: data.description,
      location: data.location,
      imageUrl: data.imageUrl,
    };
    this.moths = [...this.moths, newMoth];
    this.saveMoths();
    return newMoth;
  }

  update(id: string, data: MothUpdateDto) {
    const moth = this.moths.find((moth) => moth.id === id);
    if (!moth) {
      throw new Error(`Moth ${id} not found`);
    }

    const newMoth = { ...moth, ...data };
    this.moths = this.moths.map((moth) => (moth.id === id ? newMoth : moth));
    this.saveMoths();
    return newMoth;
  }

  delete(id: string) {
    const moth = this.moths.find((moth) => moth.id === id);
    this.moths = this.moths.filter((moth) => moth.id !== id);
    this.saveMoths();
    return moth;
  }
}
