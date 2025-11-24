import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_auth' })
export class UserAuth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // FK reference to "users" table
    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text' })
    password_hash: string;

    @Column({ type: 'timestamptz', nullable: true })
    last_login: Date;

    @Column({ type: 'int', default: 0 })
    login_attempts: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    cts: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    uts: Date;
}
