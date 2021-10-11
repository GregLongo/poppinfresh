import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Link from 'next/link'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/timeline'
import BookTimeline from "../components/BookTimeline.js"


export default function ThisStudent({student}){

  useFirebaseConnect([
    '/students',
    '/popups'
  ])

  const students = useSelector((state) => state.firebase.data.students)
  const popups = useSelector((state) => state.firebase.data.popups)

  // const initState = useSelector((state) => state.firebase.data.students['student1'].timestamps['event1'].time)

  const [selectDate, setDate] = useState()

  // useEffect(() => {
  //   setDate('12')
  // });

  const [thisPopup, selectPopup] = useState()



    if (!isLoaded(students)) {
    return <div>Loading...</div>
  }

  if (isEmpty(students)) {
    return <div>Students List Is Empty</div>
  }
  if (!isLoaded(popups)) {
  return <div>Loading...</div>
}

if (isEmpty(popups)) {
  return <div>Students List Is Empty</div>
}


  const events = students[student].timestamps;
  // [Date.parse(students["student1"].event.time), 0],;

  // const initDate = new Date(events['event1'].time)

  // console.log(Date.parse(initDate.getDate()))
//Just Date
const dates = [];

Object.keys(events).map((key,id) =>{
  // console.log(key)
  var date = new Date(Date.parse(events[key].time));
  var dateTrunc = Date.parse(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
  if(!dates.includes(dateTrunc)){dates.push(dateTrunc)};
})



//all timestamps
const timestamps = [];

  Object.keys(events).map((key,id) =>{
    var stamp = new Date(Date.parse(events[key].time));
    var stampTrunc = stamp.getFullYear()+"/"+(stamp.getMonth()+1)+"/"+stamp.getDate();
    // console.log("moo"+stampTrunc)
    if(stampTrunc == selectDate ) {timestamps.push([stamp,0,'flobrb'])}
  })

  var lastevent ="LP2";
  // console.log("sisisisi"+students[student].timestamps[lastevent].id);



  const currentBook = popups[lastevent];

// console.log("burrevimn"+currentBook.booktitle)
  // const currentPages = booksList[currentBook].pages;
  //
  // console.log("Now Reading: "+popups[lastevent].booktitle)
  // console.log("Chapter: "+popups[lastevent].title)
  // // console.log("pages: "+currentPages)



  const options = {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime'
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
      tooltip:{
          enabled: false
      },
    series:[{
      dataLabels: {
        enabled: true
      },
      allowPointSelect: true,
      point: {
          events: {
              click: function() {
                  this.series.chart.update({
                      tooltip: {
                          enabled: false
                      }
                  });
              },
              mouseOut: function() {
                  this.series.chart.update({
                      tooltip: {
                          enabled: false
                      }

                  })
              },
              select: function(events){
                const poppers = students[student].timestamps['event'+((this.x)+1)].id
                selectPopup(poppers);
                console.log(popups[poppers].category);

              }
          }
      },
      data:timestamps
    }]
  }


  // useEffect(()=>{
  //    var myDate = new Date(dates[1])
  //    setDate(myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate())
  //  })

  return(
  <div>
    <div><img src={students[student].avatar} /></div>
    <div>{students[student].name}</div>
    <div>{students[student].age}</div>
    <div>Now Reading: {currentBook.booktitle}</div>
    <div>{currentBook.title}</div>
    <BookTimeline
      lastevent= {lastevent}//pass me the id of the last item from "timestamps" via key
    />
    {dates.map((thisDate,index) =>{
    var myDate = new Date(thisDate)

    console.log(timestamps)
    return <button onClick={() => {
      setDate(myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate())

        const someevent = Object.keys(students[student].timestamps)[Object.keys(students[student].timestamps).length-1];
         lastevent = students[student].timestamps[someevent].id;
    }}>{
        myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()
      }
        </button>
     })}
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />


  </div>

)
}

ThisStudent.getInitialProps = ({query: { student } }) =>{
  return { student }
}
