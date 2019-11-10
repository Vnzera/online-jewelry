import { Controller, Post, Body, ValidationPipe, UnauthorizedException, Get } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) { }

    // '/' route for verifying json web token
    // this is where you send back the user info without the password
    // this includes name and email etc which will be used to construct their Account page
    // maybe include name field in sign up form...
    @Get('/verify')
    verify(@Body('x-auth-token') token: string) {

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            const decoded = this.jwtService.verify(token);
            return decoded.email;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    // ValidationPipe uses DTO to validate data in the body of the request
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/login')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
