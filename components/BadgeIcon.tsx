import { MinusOutlined, PlusOutlined, QuestionOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Divider, Switch } from 'antd';
import React, { useContext, useState } from 'react';
import { MovieContext } from '../providers/movies/context';


const BadgeIcon: React.FC = () => {
const { MoviesFromWatchList} = useContext(MovieContext);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);


  const onChange = (checked: boolean) => {
    setShow(checked);
  };

  return (
    <>
      <Badge count={MoviesFromWatchList.length} size={'small'} style={{marginBottom:'1vw'}}></Badge>
    </>
  );
};

export default BadgeIcon;