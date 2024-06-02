import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly hashingService: HashingService,
    ) {}

    async signUp(signUpDto: SignUpDto) {
        try {
          const user = new User(); 
          user.email = signUpDto.email; 
          user.password = await this.hashingService.hash(signUpDto.password)
          
          await this.usersRepository.save(user);
        } catch (err) {
          throw err;
        }
    }

    async signIn(signInDto: SignInDto){
      const user = await this.usersRepository.findOneBy({
        email: signInDto.email,
      });

      if(!user){
        throw new UnauthorizedException('Email or password is incorrect.');
      }

      const isCorrectPassword = await this.hashingService.compare(
        signInDto.password, 
        user.password
      )

      if(!isCorrectPassword) {
        throw new UnauthorizedException('Email or password is incorrect.');
      }

      // TODO: 
      return true; 
    }
}
