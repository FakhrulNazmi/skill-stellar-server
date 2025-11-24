import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    type: string;
    
    @Column({ type: 'text'})
    status_id: string;
    
    @Column({ type: 'text'})
    name: string;
    
    @Column({ unique: true, type: 'text'})
    internal_id: string;
    
    @Column({ unique: true, type: 'text'})
    email: string;
    
    @Column({ unique: true, type: 'text'})
    phone: string;

    @Column({ type: 'text'})
    creator: string;

    @Column({ type: 'text'})
    updator: string;

    @Column({ type: 'text'})
    deletor: string;

    @Column({ type: 'text'})
    address: string;
    
    // @Column({ type: 'datetime'})
    // cts: string;
    
    // @Column({ type: 'datetime'})
    // dts: string;
    
    // @Column({ type: 'datetime'})
    // uts: string;
    
    
}
