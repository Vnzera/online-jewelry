import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
        const email = await this.userRepository.signUp(authCredentialsDto);
        // userRepository will throw error if signUp did not work

        const payload: JwtPayload = { email };
        const token = await this.jwtService.sign(payload);
        return { token };
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
        const email = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!email) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { email };
        const token = await this.jwtService.sign(payload);

        return { token };
    }
}
