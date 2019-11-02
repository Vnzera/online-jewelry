import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

// this strategy can be used by an AuthGuard to protect a route
// jwt is taken from the header and verified using the secret provided
// either an exception will be thrown if the token is not valid or the user isn't found or Passport will return a user object

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( // connect UserRepository so we can retrieve a user entity
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({ // extracts jwt from header and uses secret to validate it
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }
    // here we retrieve a user from postgres based on the JwtPayload / email
    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.userRepository.findOne({ email });

        if (!user) {
            throw new UnauthorizedException();
        }
        // passport automatically assigns user to the request ie req.user
        return user;
    }
}
