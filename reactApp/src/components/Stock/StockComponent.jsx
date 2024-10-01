import React, { useState } from 'react'
import '../Stock/StockComponent.css'
import { postStudents } from '../../server/S_Stock/S_Stock'
import { getStudents } from '../../server/S_Stock/S_Stock'
import { useEffect } from 'react'

const StockComponent = () => {
  const [students, setStudents] = useState([])
  // const [elrojo, setElrojo] = useState('')
  // const [elverde, setElverde] = useState('')

  useEffect(() => {
    extractData()
  }, [])

  // const rooooja = () => {
  //   setElrojo('rojo')
  //   setElverde('')
  // }
  
  // const veeerde = () => {
  //   setElverde('verde')
  //   setElrojo('')
  // }

  const extractData = async () => {
    const data = await getStudents()
    console.log(data);
    
    setStudents(data)
  }
  
  return (
    <>
    <div className="containerAll">
      <div>Alertas</div>
        <div className="containerFormStock"></div>
        <div className="containerStock">
            <div className="tittles">
              <div>Cédula</div>
              <div>Nombre</div>
              <div>Sección</div>
            </div>
            <div className="students">
              {students.map((student, index) => (
                <div key={index} className="student">
                  <div>{student.cedula}</div>
                  <div>{student.name}</div>
                  <div>{student.seccion}</div>
                </div>
              ))}
            </div>
        </div>
        {/* ff */}
        {/* <div className='cont'>
          {elrojo == '' ? <div onMouseOver={(() => rooooja())} className="rojo"></div> : <div  className="rojo2"></div>}
          {elverde == '' ? <div onMouseOver={(() => veeerde())} className="verde"></div> : <div className="verde2"></div>}
        </div> */}


          {/* OP TERNARIO */}
        
    </div>
    </>
  )
}

export default StockComponent