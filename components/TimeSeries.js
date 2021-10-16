import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Highcharts from 'highcharts'
import bullet from 'highcharts/modules/bullet.js'
import HighchartsReact from 'highcharts-react-official'



export default function TimeSeries(props){
  bullet(Highcharts);
 //
 // const [val, setVal ] = useState(props.val);
 // const [title, setTitle ] = useState(props.title);

  const [options, setOptions] = useState({
    chart: {
      styledMode: false,
      width: 600,
      height: 300,
  },

  title: {
      text: 'SOme Time Series Something'
  },

  xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  defs: {
      gradient0: {
          tagName: 'linearGradient',
          id: 'gradient-0',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          children: [{
              tagName: 'stop',
              offset: 0
          }, {
              tagName: 'stop',
              offset: 1
          }]
      },
      gradient1: {
          tagName: 'linearGradient',
          id: 'gradient-1',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          children: [{
              tagName: 'stop',
              offset: 0
          }, {
              tagName: 'stop',
              offset: 1
          }]
      }
  },

  series: [{
      type: 'area',
      keys: ['y', 'selected'],
      data: [
          [29.9, false],
          [71.5, false],
          [106.4, false],
          [129.2, false],
          [144.0, false],
          [176.0, false],
          [135.6, false],
          [148.5, false],
          [216.4, true],
          [194.1, false],
          [95.6, false],
          [54.4, false]
      ]
  }]
    });

    return <div><HighchartsReact highcharts={Highcharts} options={options} /></div>;
  };
