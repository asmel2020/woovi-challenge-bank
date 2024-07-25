import { connectDatabase } from '../common/database';
import { createUser } from './createUser';
(async () => {
  await connectDatabase();
  await createUser();
  process.exit(0);
})();
