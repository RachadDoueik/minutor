export interface UserSummaryDto {
    id: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER';
}