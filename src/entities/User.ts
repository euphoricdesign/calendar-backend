import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Event } from './Event';
import { Credential } from './Credential';

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToOne(() => Credential)
    credential: Credential

    @OneToMany(() => Event, (event) => event.user)
    events: Event[]
}