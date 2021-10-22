import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/timeline'
import PopupInspector from "/components/PopupInspector"


export default function DayTimeline(props){

  useFirebaseConnect([
    '/students', //in the future change this to just query 1 student, but since its just one class wtv
    '/popups'
  ])

  const students = useSelector((state) => state.firebase.data.students)
  const popups = useSelector((state) => state.firebase.data.popups)

  const [selectDate, setDate] = useState()

  const [thisPopupTitle, selectPopupTitle] = useState()
  const [thisPopupCategory, selectPopupCategory] = useState();
  const [thisPopupText, selectPopupText] = useState();

  const student = [props.student]

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
    console.log(popups[events[key].id].category)
    var cat = popups[events[key].id].category;
    var interactive = popups[events[key].id].interactive;
    if(stampTrunc == selectDate ) {timestamps.push({x:stamp,y:0,cat:cat,interactive:interactive})}
  })

  var lastevent ="LP3";
  // console.log("sisisisi"+students[student].timestamps[lastevent].id);



  const currentBook = popups[lastevent];

  const selectedPopup = {
    title: thisPopupTitle,
    category: thisPopupCategory,
    text: thisPopupText
  }

  const options = {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      lineWidth: 3,
    },
    legend:{
      enabled: false
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
        enabled: true,
        useHTML: true,
        allowOverlap: false,
        formatter() {
          console.log(this.point.blorb)
          var thisClass = '';
          	if (this.point.interactive) {
              return '<div>'+ this.point.cat +'<img src="https://www.highcharts.com/samples/graphics/sun.png"></img></div>'
            } else {
            	return '<div>'+ this.point.cat +'<img src="https://www.highcharts.com/samples/graphics/snow.png"></img></div>'
            }
          }
      },
      lineWidth: '3px',
      lineWidthPlus: '3px',
      color: 'black',
      allowPointSelect: true,
      states: {
          hover:{
            enabled: false
          },
          inactive: {
              enabled: false
          },
      },
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
                const poppers = students[student].timestamps['event'+((this.index)+1)].id
                selectPopupTitle(popups[poppers].title)
                selectPopupCategory(popups[poppers].category)
                selectPopupText(popups[poppers].text)
              }
          }
      },
      data:timestamps
    }]
  }

  return(
  <div>
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
    <PopupInspector {...selectedPopup} />
  </div>

)
}
