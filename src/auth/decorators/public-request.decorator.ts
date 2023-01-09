import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'publicReq';
export const PublicRequest = (...args: string[]) => SetMetadata(PUBLIC_KEY, true);
