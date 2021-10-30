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
import PopupInspector from "/components/PopupInspector.js"

import PopupTable from '../components/PopupTable.js'
import PopupTable2 from '../components/PopupTable2.js'
import styled from "@emotion/styled"
import { css, jsx } from '@emotion/react'


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

   const selectedPopup = {
     title: expandedPopup.title,
     category: expandedPopup.category,
     text: expandedPopup.text
   }

   const Heading = styled.div`
     padding-top: 2rem;
     padding-bottom: 2rem;
     padding-left: 3rem;
     font-size: 36px;
     border-bottom: 2px solid #CECECE
   `
   const RightContainer = styled.div`
     background: white;
     padding: 1rem 2rem;
     margin: 3rem;
     border-radius: 10px;
   `


  return(
    <div>
    <Heading>All Popups</Heading>
      <div css={css`
          display: grid;
          grid-template-columns: 60% 40%;
        `}>
        <PopupTable2 papusas={papusas}  grandParentCallback={callback} />
        <RightContainer>
          <PopupInspector {...selectedPopup} />
        </RightContainer>
      </div>
    </div>
  )

}
