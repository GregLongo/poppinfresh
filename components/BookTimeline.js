import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Link from 'next/link'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/timeline'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTh
} from "@fortawesome/free-solid-svg-icons";

// import * as bulb from 'img/bulb.svg'

export default function BookTimeline({student, lastevent, parentCallback}){

  useFirebaseConnect([
    '/popups',
    '/books'
  ])

  const popups = useSelector((state) => state.firebase.data.popups)
  const booksList = useSelector((state) => state.firebase.data.books)

  const [thisPopup, selectPopup] = useState()


    if (!isLoaded(popups)) {
    return <div>Loading...</div>
  }

  if (isEmpty(popups)) {
    return <div>Students List Is Empty</div>
  }

  if (!isLoaded(booksList)) {
  return <div>Loading...</div>
}

if (isEmpty(booksList)) {
  return <div>Students List Is Empty</div>
}


  const lastpopup = lastevent;



  const currentBook = popups[lastpopup].bookid;

  const currentPages = booksList[currentBook].pages;

  console.log("Now Reading: "+popups[lastpopup].booktitle)
  console.log("Chapter: "+popups[lastpopup].title)
  console.log("pages: "+currentPages)


// `µˆ∫¨≈´˚ˆø…∆ŒÅ


  const isInteractive = true;
  const symbol = isInteractive ?
  'url(http://simpleicon.com/wp-content/uploads/rocket.svg)'
    :'url(http://simpleicon.com/wp-content/uploads/star.svg)'

const bookmarks=[];
const progress=[];

Object.keys(popups).map((key, id)=>{
    var page = popups[key].page;
    var cat = popups[key].category;
    var interactive = popups[key].interactive;
    bookmarks.push({key:key,x:page,y:0,cat:cat,interactive:interactive});
    bookmarks.push({x:0,y:0,cat:'',interactive:false});
    bookmarks.unshift({x:currentPages,y:0,cat:'',interactive:false});
})



Object.keys(bookmarks).map((key, id)=>{
  console.log(popups[lastpopup].page)
  if(bookmarks[key].x <= popups[lastpopup].page){
    progress.push(bookmarks[key])
  }
})

// console.log(progress)




// const timestamps = [];
//
//   Object.keys(events).map((key,id) =>{
//     var stamp = new Date(Date.parse(events[key].time));
//     var stampTrunc = stamp.getFullYear()+"/"+(stamp.getMonth()+1)+"/"+stamp.getDate();
//     // console.log("moo"+stampTrunc)
//     if(stampTrunc == selectDate ) {timestamps.push([stamp,0,'flobrb'])}
//   })
//


  const options = {
    title: {
      text: ''
    },
    credits:{
      enabled:false
    },
    legend:{
      enabled: false
    },
    chart: {
        spacingTop: 0,
        spacingBottom: 50,
        spacingLeft: 10,
        spacingRight: 10,
        height: 140
      },
      xAxis: {
        visible: false,
        min: 0,
        max: currentPages,
        opposite: true
      },
      yAxis:{
        visible: false
      },
      tooltip:{
          enabled: false
      },
    series:[{
      animation: false,
      data:bookmarks,
      type: 'line',
      lineWidth: '10px',
      color: 'lightgrey',
      marker:{
        enabled: true,
      },
      states: {
          hover:{
            enabled: false
          },
          inactive: {
              enabled: false
          },
      },
      dataLabels: {
        y: 45,
        enabled: true,
        useHTML: true,
        allowOverlap: false,
        formatter() {
          console.log(this.point.blorb)
          var thisClass = '';

          if(this.point.x !=0 && this.point.x !=currentPages){
            if(this.point.x > popups[lastpopup].page){
              thisClass= styles.desaturate
            }
          	if (this.point.interactive) {
              return '<div class="'+ thisClass +'"><img src="/img/interactive.svg"></img></div>'
            } else {
            	return '<div class="'+ thisClass +'"><img src="/img/bulb.svg"></img></div>'
            }
          }
        }        // shape: 'url(http://simpleicon.com/wp-content/uploads/rocket.svg)',
        // style:{
        //   width: '24px',
        //   height: '24px',
        //   fontSize: 12
        //   }
      },
      // marker: true ? {
      //   symbol: "url(http://simpleicon.com/wp-content/uploads/rocket.svg)",
      //     height: 24,
      //     width: 24,
      // }:
      // {
      //   symbol: "url(http://simpleicon.com/wp-content/uploads/star.svg)",
      //     height: 24,
      //     width: 24,
      // },

      allowPointSelect: true,
      cursor: 'pointer',
      point: {
          events: {
              select: function(events){
                events.preventDefault()
                console.log(this)
                parentCallback(this.options.key)
              }
          }
      },
    },
    {
      cursor: 'pointer',
      allowPointSelect: true,
      point: {
          events: {
              select: function(events){
                events.preventDefault()
                console.log(this)
                parentCallback(this.options.key)
              }
          }
      },
      states: {
          hover:{
            enabled: false
          },
          inactive: {
              enabled: false
          },
      },
      data:progress,
      type: 'line',
      lineWidth: '10px',
      color: '#77C294'
    }
    ]
  }

  return(
  <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>

)
}

BookTimeline.getInitialProps = ({query: { popups } }) =>{
  return { popups }
}
