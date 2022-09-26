// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '..';
import generateTasks from '../../src/utils/generateTasks'

type Data = {
  tasks: Task[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'GET') {
    const randomTodos = await generateTasks({ limit: 6 });

    res.status(200).json({ tasks : randomTodos ?? [] })
  }
}
