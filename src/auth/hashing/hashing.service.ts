/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export abstract class HashingService {
  abstract hash(data: string | Buffer): Promise<string>; 
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>; 
}
