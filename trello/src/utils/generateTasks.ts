import axios, { Axios, AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import { TaskType } from '../../pages';

type TProps = {
 limit: 3 | 6 | 9 | 12;
};

type TTypes = {
  [key in (0 | 1 | 2)] : TaskType;
}

async function generateTasks ({ limit }: TProps) {
  try {
    const { data }: AxiosResponse<string, { headers : { accept: string, "X-Api-Key" : string }}>  = await axios.get(`https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=words&number=${limit}`, {
      headers : {
        accept: '*/*',
        "X-Api-Key" : '77c99fbb95ef45ecb8e0550cc2dfd284'
      }
    });

    const types : TTypes = {
      0 : 'todo',
      1 : 'in-progress',
      2 : 'done',
    }

    return [
      ...data
        .split(' ')
        .map((item) => (
          { 
            id: nanoid(), 
            title: item, 
            description: '내용 랜덤', 
            type: types[Math.floor(Math.random() * 3) as  (0 | 1 | 2)]
          }))
        ]

  } catch (error) {
    console.error(error);
  }

}

export default generateTasks;