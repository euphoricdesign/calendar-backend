import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from "./User";

@Entity({
    name: "events"
})
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column()
    notes: string;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @ManyToOne(() => User, (user) => user.events)
    user: User;
}
