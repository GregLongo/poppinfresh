import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/timeline'
import PopupInspector from "/components/PopupInspector"
import styled from "@emotion/styled"
import { css } from '@emotion/react';

export default function DayTimeline(props){

  useFirebaseConnect([
    '/classes', //in the future change this to just query 1 student, but since its just one class wtv
    '/popups'
  ])

  const classes = useSelector((state) => state.firebase.data.classes)
  const popups = useSelector((state) => state.firebase.data.popups)


  // const [thisPopupTitle, selectPopupTitle] = useState()
  // const [thisPopupCategory, selectPopupCategory] = useState();
  // const [thisPopupText, selectPopupText] = useState();

  const student = [props.student]

    if (!isLoaded(classes)) {
    return <div>Loading...</div>
  }

  if (isEmpty(classes)) {
    return <div>Students List Is Empty</div>
  }
  if (!isLoaded(popups)) {
  return <div>Loading...</div>
}

if (isEmpty(popups)) {
  return <div>Students List Is Empty</div>
}

const students=classes[props.classroom];

  const events = students[student].timestamps;

//Just Date
const dates = [];

Object.keys(events).map((key,id) =>{
  // console.log(key)
  var date = new Date(Date.parse(events[key].time));
  var dateTrunc = Date.parse(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
  if(!dates.includes(dateTrunc)){dates.push(dateTrunc)};
})

  const latest = new Date(dates[dates.length - 1]);
  const lastdate = latest.getFullYear()+"/"+(latest.getMonth()+1)+"/"+latest.getDate();

const [selectDate, setDate] = useState(lastdate)


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

const DateButton = styled.button`
  background: transparent;
  border: none;
  border-top: 3px solid lightblue;
  padding-top: .5rem;
  margin-right: .5rem;
  cursor: pointer;
  &:hover{
    border-top: 3px solid teal;
  }
`
const DateMarquis = styled.div`
  padding: 2rem .5rem 0rem;
  font-size: 24px
`

//point markers inserted via html so referenced by class. is this direct dom manipulation? is this bad?
const ChartContainer = styled.div`
   .cat{
    background: #B4D260;
    padding: .2rem .4rem;
    border-radius: 16px;
    color: white
  }
  .pop{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer
  }
  img{
    width: 20px;
    height: 20px;
    margin: .5rem
  }
`

  const currentBook = popups[lastevent];

  // const selectedPopup = {
  //   title: thisPopupTitle,
  //   category: thisPopupCategory,
  //   text: thisPopupText
  // }

  const options = {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      lineWidth: 3,
      opposite: true,
    },
    yAxis:{
      visible: false,
    },
    legend:{
      enabled: false
    },
    credits:{
      enabled:false
    },
    chart: {
        spacingBottom: 140,
        spacingTop: 40,
        spacingLeft: 10,
        spacingRight: 10,
        height: 220,
      },
      tooltip:{
          enabled: false
      },
    series:[{
      dataLabels: {
       offset:300,
        enabled: true,
        useHTML: true,
        allowOverlap: false,
        formatter() {
          // console.log(this.point.blorb)
          var thisClass = '';
          	if (this.point.interactive) {
              return '<div class="pop"><img src="/img/interactive.svg"><span class="cat">'+ this.point.cat +'</span></div>'
            } else {
            	return '<div class="pop"><img src="/img/bulb.svg"><span class="cat">'+ this.point.cat +'</span></div>'
            }
          }
      },      lineWidth: '4px',
      lineWidthPlus: '4px',
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
              select: function(events){
                events.preventDefault()
                // console.log(events)
                const poppers = students[student].timestamps['event'+((this.index)+1)].id
                // selectPopupTitle(popups[poppers].title)
                // selectPopupCategory(popups[poppers].category)
                // selectPopupText(popups[poppers].text)
                props.parentCallback(poppers)
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
    return <DateButton onClick={() => {

      setDate(myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate())

        const someevent = Object.keys(students[student].timestamps)[Object.keys(students[student].timestamps).length-1];
         lastevent = students[student].timestamps[someevent].id;
    }}>{
        myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()
      }
        </DateButton>
     })}
     <DateMarquis>{selectDate}</DateMarquis>
     <ChartContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
     </ChartContainer>
  </div>

)
}
