// create-userauth.dto.ts
export class CreateUserAuthDto {
  user_id: string;          // FK to users.id
  username: string;         
  password_hash: string;         // plaintext input, will hash
  cts: string;
}
