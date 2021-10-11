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

export default function BookTimeline({student, lastevent}){

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

Object.keys(popups).map((key, id)=>{
    var page = popups[key].page;
    bookmarks.push([page,0]);
})



  const options = {
    title: {
      text: ''
    },
    credits:{
      enabled:false
    },
    chart: {
        spacingBottom: 15,
        spacingTop: 0,
        spacingLeft: 10,
        spacingRight: 10,
        width: 700,
        height: 300
      },
      xAxis: {
        offset: -1143,
        min: 0,
        max: currentPages,
      },
      tooltip:{
          enabled: false
      },
    series:[{
      type: 'line',
      dataLabels: {
        enabled: true,
        // shape: 'url(http://simpleicon.com/wp-content/uploads/rocket.svg)',
        // style:{
        //   width: '24px',
        //   height: '24px',
        //   fontSize: 12
        //   }
          },
      marker:{
        symbol:symbol,
        width: 24,
        height:24,
      },
      allowPointSelect: false,
      point: {
        y: "-240"
      //     events: {
      //         click: function() {
      //             this.series.chart.update({
      //                 tooltip: {
      //                     enabled: false
      //                 }
      //             });
      //         },
      //         mouseOut: function() {
      //             this.series.chart.update({
      //                 tooltip: {
      //                     enabled: false
      //                 }
      //
      //             })
      //         },
      //         select: function(events){
      //           const poppers = students[student].timestamps['event'+((this.x)+1)].id
      //           selectPopup(poppers);
      //           console.log(popups[poppers].category);
      //
      //         }
      //     }
      },
      data:bookmarks,
    }]
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
