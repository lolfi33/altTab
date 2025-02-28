import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  openAt: Date;

  @Column('json')
  tablePlan: any;
}
export default Service;
