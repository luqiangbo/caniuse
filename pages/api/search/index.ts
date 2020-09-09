import { getAllSearch } from 'fetch/index';

export default async (req, res) => {
  const { body, query, cookies } = req;
  console.log('api', query);
  const page = 0;
  const [errAll, resAll] = await getAllSearch(page, '面试');
  // console.log('api', errAll);
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resAll);
};