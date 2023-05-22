import { MinusOutlined, PlusOutlined, QuestionOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Divider, Switch } from 'antd';
import React, { useContext, useState } from 'react';
import { MovieContext } from '../providers/movies/context';


const ButtonGroup = Button.Group;

const BadgeIcon: React.FC = () => {
const {WatchListMovie, WatchList}=useContext(MovieContext);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };


  const onChange = (checked: boolean) => {
    setShow(checked);
  };

  return (
    <>
      <Badge count={WatchList.length} size={'small'} style={{marginBottom:'1vw'}}></Badge>
    </>
  );
};

export default BadgeIcon;