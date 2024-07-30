import { faker } from '@faker-js/faker';
import { clearDatabase, connectMongoose, disconnectMongoose } from '../../../test/confingMongodbMemoryServer';
import TransactionModel from '../TransactionsModel';
import UserModel, { IUser } from '../UserModel';

const userFaker = {
  name: faker.person.fullName().toLocaleLowerCase(),
  email: faker.internet.email().toLocaleLowerCase(),
  password: faker.internet.password(),
  balance: faker.number.int({ min: 1000, max: 100000 })
};

beforeAll(connectMongoose);

beforeEach(clearDatabase);

afterAll(disconnectMongoose);

describe('TransactionsModel', () => {
  it('create a new transaction', async () => {
    const userOne = await new UserModel({
      name: userFaker.name,
      email: userFaker.email,
      password: userFaker.password,
      balance: userFaker.balance
    }).save();

    const userTwo = await new UserModel({
      name: userFaker.name,
      email: userFaker.email,
      password: userFaker.password,
      balance: userFaker.balance
    }).save();

    const transaction = await new TransactionModel({
      sender: userOne._id,
      recipient: userTwo._id,
      amount: 100,
      description: 'test transaction',
      direction: 'sent'
    }).save();

    const transactionModel = await TransactionModel.findOne({ _id: transaction._id })

      .populate<{ sender: IUser; recipient: IUser }>(['sender', 'recipient'])
      .exec();

    expect(transactionModel?.sender.id).toEqual(userOne.id);
    expect(transactionModel?.recipient.id).toEqual(userTwo.id);
    expect(transactionModel?.amount).toEqual(100);
    expect(transactionModel?.description).toEqual('test transaction');
    expect(transactionModel?.direction).toEqual('sent');
  });
});
