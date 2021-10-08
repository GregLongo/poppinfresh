import React, { useState } from 'react'
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

export default function ThisStudent({student}){

  useFirebaseConnect([
    '/students',
  ])

  const students = useSelector((state) => state.firebase.data.students)
  const [selectDate, setDate] = useState('12')

  if (!isLoaded(students)) {
    return <div>Loading...</div>
  }

  if (isEmpty(students)) {
    return <div>Students List Is Empty</div>
  }

  const events = students[student].timestamps;
  // [Date.parse(students["student1"].event.time), 0],;

  const initDate = new Date(events['event1'].time)

  console.log(Date.parse(initDate.getDate()))
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
    if(stamp.getDate() == selectDate ) {timestamps.push([stamp,0])}
  })

  // Object.keys(events).map((key,id) =>{
  //   var stamp = Date.parse(events[key].time);
  //
  //   timestamps.push([stamp,0]);
  // })
  // console.log(dates)

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
    series:[{
      data:timestamps
    }]
  }

  return(
  <div>
    <div><img src={students[student].avatar} /></div>
    <div>{students[student].name}</div>
    <div>{students[student].age}</div>
    {dates.map((thisDate) =>{
    var myDate = new Date(thisDate)

    return <button onClick={() => setDate(myDate.getDate())}>{
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
