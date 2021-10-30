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
import styled from "@emotion/styled"


export default function BulletChart(props){
  bullet(Highcharts);

 const [val, setVal ] = useState(props.val);
 const [title, setTitle ] = useState(props.title);
const Bullet = styled.div`
  display: flex;
  align-items: center;
  span{
      padding-top: .5rem;
      font-size: 12px
  }
`

  const [options, setOptions] = useState({
      chart: {
        marginTop: props.sm ? 22 : null,
        marginBottom: props.sm ? 8 : null,
        inverted: true,
        type: "bullet",
        styledMode: false,
        height: props.sm ? 48 : 100,
        width: props.sm ? 220 : null,
        backgroundColor: 'transparent',
      },
      title: {
        text: title,
        align: 'left',
        style:{
          fontSize: 12
        }
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
          // '<span class="hc-cat-title">Revenue</span><br/>U.S. $ (1,000s)'
        ]
      },
      plotOptions: {
        series: {
          borderRadius: 8,
          lineWidth: 8,
          pointPadding: 0,
          borderWidth: 0,
          color: props.color,
          marginTop: 0,
          marginBottom: 0,
          targetOptions: {
            width: 0,
          }
        },
      },
      legend: {
        enabled: false
      },
      xAxis:{
        visible: false
      },
      yAxis: {
        // height: 6,

        max:props.max,
        visible: true,
        gridLineWidth: 1,
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
        title: 'jdjjsjkjkdj',
        labels:{
          style:{
            fontSize: 8
          }
        }
      },
      series: [
        {
          targetOptions: {
            width: 20,
          },
          data: [
            {
              y: val,
              // target: 270
            }
          ]
        }
      ],
    });

    return <Bullet><HighchartsReact highcharts={Highcharts} options={options} /><span>{val}</span></Bullet>;
  };
