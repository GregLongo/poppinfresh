import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Link from 'next/link'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import 'highcharts/modules/timeline'

import PopupTable from '../components/PopupTable.js'
import PopupTable2 from '../components/PopupTable2.js'


export default function PopupsLegend(){

  useFirebaseConnect([
    '/popups'
  ])

  const popups = useSelector((state) => state.firebase.data.popups)

  //
  // const [thisPopupTitle, selectPopupTitle] = useState()
  // const [thisPopupCategory, selectPopupCategory] = useState();
  // const [thisPopupText, selectPopupText] = useState();

  const papusas = [];


    const [lp, setLP] = useState(0);

    const callback = useCallback((lp) =>{
      setLP(lp);
    },[]);

  if (!isLoaded(popups)) {
  return <div>Loading...</div>
  }

  if (isEmpty(popups)) {
  return <div>Students List Is Empty</div>
  }

  if (isLoaded(popups)) {
    Object.keys(popups).map((key,id)=>{
      papusas.push({
        lp:key,
        title:popups[key].title,
        category:popups[key].category,
        page:popups[key].page,
        interactive:popups[key].interactive ? 'yes' : 'no',
        plays:'22'
      })
    })
  }

  // console.log(popups[lp].text)

   const expandedPopup = lp ? popups[lp] : 'choose popup';
  return(
    <div>
      <PopupTable2 papusas={papusas}  grandParentCallback={callback} />
      <div>{expandedPopup.title}</div>
      <div>{expandedPopup.category}</div>
      <div>{expandedPopup.text}</div>
    </div>
  )

}
