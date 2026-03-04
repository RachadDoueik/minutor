// src/auth/supabase.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt , Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {

    const jwksUri = configService.get<string>('SUPABASE_JWT_URI');
    const issuer = configService.get<string>('SUPABASE_JWT_ISSUER');
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${jwksUri}`,
      }),
      audience: 'authenticated' ,
      issuer: `${issuer}`,
      algorithms: ['ES256'],
    });

  }

  async validate(payload: any) {

    return { 
    id: payload.sub,
    username: payload.username, 
    email: payload.email,
    role: payload.role 
  };
  }
}
