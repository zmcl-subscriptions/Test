import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterDo } from 'src/_schemas/user.do';

export class CounterRepository {
  constructor(
    @InjectModel('Counter')
    private counterModel: Model<CounterDo>,
  ) {}
  
  async getSeq(): Promise<any> {
    const seq = await this.counterModel.findOneAndUpdate({id:"entity"},{ $inc: { seq: 1 } }, {new: true });
    return seq;
  }
}
