"use client"

import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"
import './Donut.css'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const maxDaysPerWeek = 5 // Monday to Friday

const predefinedColors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 206, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
  'rgb(231, 233, 237)',
  'rgb(255, 0, 255)'
]

const CenterTextPlugin = {
  id: 'centerText',
  afterDraw(chart, args, options) {
    const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart

    ctx.save()
    if (options.text) {
      const text = options.text
      const textX = left + width / 2
      const textY = top + height / 2

      ctx.beginPath()
      ctx.arc(textX, textY, Math.min(width, height) / 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fill()

      ctx.font = options.font || '16px Arial'
      ctx.fillStyle = options.color || 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const lines = text.split('\n')
      const lineHeight = 20
      lines.forEach((line, index) => {
        const yOffset = (index - (lines.length - 1) / 2) * lineHeight
        ctx.fillText(line, textX, textY + yOffset)
      })
    }
    ctx.restore()
  }
}

ChartJS.register(CenterTextPlugin)

export default function StudentAttendanceChart() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (students.length > 0) {
      updateChart()

      // Set up interval for random student selection
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * students.length)
        setSelectedIndex(randomIndex)
      }, 10000) // 10 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId)
    }
  }, [students])

  useEffect(() => {
    if (students.length > 0) {
      updateChart()
    }
  }, [selectedIndex, students])

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/estudiantes/')
      if (!response.ok) {
        throw new Error('Failed to fetch student data')
      }
      const data = await response.json()
      const studentsWithAttendance = await Promise.all(data.map(async (student) => {
        const attendanceResponse = await fetch(`http://localhost:8000/api/hist_pagos/${student.id}/`)
        if (attendanceResponse.ok) {
          const attendanceData = await attendanceResponse.json()
          return {
            ...student,
            attendance: attendanceData.days_attended || 0,
            color: student.color || predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
          }
        } else {
          return {
            ...student,
            attendance: 0,
            color: student.color || predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
          }
        }
      }))
      setStudents(studentsWithAttendance)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const updateChart = () => {
    let labels = []
    let data = []
    let colors = []
    let borderColors = []

    labels = students.map(s => s.name)
    data = students.map(s => s.attendance)
    colors = students.map(s => s.color)
    borderColors = students.map(() => 'black')

    setChartData({
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
      }]
    })
  }

  const calculateTotalAttendancePercentage = () => {
    const totalAttendance = students.reduce((sum, student) => sum + student.attendance, 0)
    const maxPossibleAttendance = students.length * maxDaysPerWeek
    return ((totalAttendance / maxPossibleAttendance) * 100).toFixed(2)
  }

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index
      setSelectedIndex(prevIndex => prevIndex === clickedIndex ? null : clickedIndex)
    } else {
      setSelectedIndex(null)
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        padding: 10,
        cornerRadius: 5,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.parsed || 0
            const percentage = ((value / maxDaysPerWeek) * 100).toFixed(2)
            return `${label}: ${value} days (${percentage}%)`
          }
        },
      },
      title: {
        display: false,
      },
      centerText: {
        text: selectedIndex !== null && students[selectedIndex]
          ? `${students[selectedIndex].name}\n${students[selectedIndex].attendance} / ${maxDaysPerWeek}\n${((students[selectedIndex].attendance / maxDaysPerWeek) * 100).toFixed(2)}%`
          : `Total\n${calculateTotalAttendancePercentage()}%`,
        color: 'white',
        font: '16px Arial',
      },
    },
    onClick: handleClick,
  }

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Student Attendance Chart</h2>
      <p className="mb-4">Weekly attendance (Monday to Friday)</p>
      <div className="w-[400px] h-[400px] mx-auto">
        {chartData && <Doughnut data={chartData} options={chartOptions} />}
      </div>
    </div>
  )
}