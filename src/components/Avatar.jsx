import React, {useEffect} from 'react';

export const NavbarImg = ({avatar}) => {

  return (
    <>
    <img className="avatar" src={avatar} key={avatar}/>
    </>
  )
}