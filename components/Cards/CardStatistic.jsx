import api from '@/utils/api';
import { redirect,Link } from 'next/navigation';
import React from 'react';

export default function CardStatistic({ activeAttribute,positions }) {
  const isOdd = (count) => count % 2 !== 0;
  const [isEdit, setIsEdit] = React.useState(false);



  const [question, setQuestion] = React.useState([])

  const displayForAttributes = (attribute_name) => {
    const matchingQuestion = question.find(q => q.attribute_name === attribute_name);
  
    if (matchingQuestion) {
      return matchingQuestion.attribute_display;
    }
  }

  const fetchAttributesMaster = async () => {
    const response = await api.getAttributeMaster();
    setQuestion(response);
    
  }


  React.useEffect(() => {
    fetchAttributesMaster();
  }, []);



  const handleReset = () => {
    setAttribute(tempAttribute);
    setIsEdit(false);
  };
  


  const redirectEdit = (id) => {
    redirect('/form/' + id);
  }



  return (
    <div className="bg-white mb-6 shadow-xl rounded-xl px-6 pt-6 pb-12 justify-between mx-6 h-fit">
      <div className="flex flex-row justify-between">
        <h3 className="text-4xl font-semibold">Player Statistic</h3>
        <div className="flex flex-row gap-2">
          
          

        </div>
      </div>

      <div className="flex flex-row flex-wrap my-8 gap-4 h-fit">
      {Object.entries(activeAttribute)
        .filter(([key, value]) => key !== 'created_date' && key !== 'id' && key !== 'positions' && key !== 'latest_articles' && key !== 'weight' && key !== 'height' && key !== 'prefered_foot')
        .map(([key, value], index) => (
          <div
            key={index}
            className={`flex flex-row justify-between w-64 my-1 ${
              isOdd(index) ? 'bg-white' : 'bg-gray-200'
            } px-4 py-2 rounded-lg`}
          >
            <h5>{displayForAttributes(key)}</h5>
            <p>{value}</p>
          </div>
        ))}
      </div>
            <hr />
      <div className="flex flex-col">
      <h1 className='text-center font-semibold text-xl mt-4'>Similar Players</h1>
        <p  className='text-center mb-4'>Pemain berikut adalah yang atribut kemampuannya mirip dengan Anda</p>
      <div className="flex md:flex-row flex-col justify-center gap-4">
        
        <div
            className={`flex flex-row justify-between my-1 bg-slate-200 px-4 py-4 rounded-lg gap-3`}
          >
            <div className='w-4 h-4 rounded-full bg-red-500 my-auto'></div>
            <a href={`https://www.youtube.com/results?search_query=${positions?.player_alike1.split(' ').join('+')}+skills`} target="_blank">{positions?.player_alike1} ({positions?.position_alike1})</a>
            
          </div>
          <div
            className={`flex flex-row justify-between my-1 bg-slate-200 px-4 py-4 rounded-lg gap-3`}
          >
            <div className='w-4 h-4 rounded-full bg-red-500 my-auto'></div>
            <a href={`https://www.youtube.com/results?search_query=${positions?.player_alike2.split(' ').join('+')}+skills`} target="_blank">{positions?.player_alike2} ({positions?.position_alike2})</a>
            
          </div>
          <div
            className={`flex flex-row justify-between my-1 bg-slate-200 px-4 py-4 rounded-lg gap-3`}
          >
            <div className='w-4 h-4 rounded-full bg-red-500 my-auto'></div>
            <a href={`https://www.youtube.com/results?search_query=${positions?.player_alike3.split(' ').join('+')}+skills`} target="_blank">{positions?.player_alike3} ({positions?.position_alike3})</a>
            
          </div>
        </div>
      </div>
    </div>
  );
}
