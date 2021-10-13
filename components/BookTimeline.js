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
const progress=[];

Object.keys(popups).map((key, id)=>{
    var page = popups[key].page;
    var cat = popups[key].category;
    var interactive = popups[key].interactive;
    bookmarks.push({x:page,y:0,cat:cat,interactive:interactive});
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
      animation: false,
      data:bookmarks,
      type: 'line',
      lineWidth: '10px',
      states: {
          hover:{
            enabled: false
          },
          inactive: {
              enabled: false
          },
      },
      dataLabels: {
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
              return '<div class="'+ thisClass +'"><img src="https://www.highcharts.com/samples/graphics/sun.png"></img></div>'
            } else {
            	return '<div class="'+ thisClass +'"><img src="https://www.highcharts.com/samples/graphics/snow.png"></img></div>'
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
        // y: 240
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
    },
    {
      cursor: 'pointer',
      allowPointSelect: true,

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
      color: 'teal'
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
