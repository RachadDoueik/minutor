import { Module , Global} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [SupabaseStrategy  , ConfigService],
})
export class AuthModule {}
