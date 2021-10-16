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



export default function BulletChart(props){
  bullet(Highcharts);

 const [val, setVal ] = useState(props.val);
 const [title, setTitle ] = useState(props.title);

  const [options, setOptions] = useState({
      chart: {
        marginTop: 40,
        marginBottom: 40,
        inverted: true,
        marginLeft: 135,
        type: "bullet",
        styledMode: false,
        height: 140,
        width: 600
      },
      title: {
        text: title
      },
      credits:{
        enabled: false
      },
      tooltip:{
        enabled: false
      } ,
      height: 1,
      xAxis: {
        categories: [
          '<span class="hc-cat-title">Revenue</span><br/>U.S. $ (1,000s)'
        ]
      },
      plotOptions: {
        series: {
          lineWidth: 20,
          pointPadding: 0.25,
          borderWidth: 0,
          color: "#000",
          targetOptions: {
            width: 0,
          }
        }
      },
      legend: {
        enabled: false
      },
      yAxis: {
        gridLineWidth: 0,
        // plotBands: [
        //   {
        //     from: 0,
        //     to: 150,
        //     color: "#666"
        //   },
        //   {
        //     from: 150,
        //     to: 225,
        //     color: "#999"
        //   },
        //   {
        //     from: 225,
        //     to: 9e9,
        //     color: "#bbb"
        //   }
        // ],
        title: 'jdjjsjkjkdj'
      },
      series: [
        {
          targetOptions: {
            width: 20,
          },
          data: [
            {
              y: val,
              target: 270
            }
          ]
        }
      ],
    });

    return <div><HighchartsReact highcharts={Highcharts} options={options} /></div>;
  };
