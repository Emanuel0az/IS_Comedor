import React, { useState, useEffect } from 'react';
import { getStudents } from '../../server/S_Stock/S_Stock';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { postAsistencia } from '../../server/Asistencia/PostAsistencia';
import putAsistencia from '../../server/Asistencia/PutAsistencia';
import CalendarioStudent from '../CalendarioStudent/CalendarioStudent';
import SessionsChartStudents from '../GraficaStudents/GraficaStudents';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../Stock/StockComponent.css';
import { useIdContext } from '../UsinngContext';

const StockComponent = () => {
    const [Students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [InputFiltro, setInputFiltro] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 50;
    const [selectedDate, setSelectedDate] = useState(new Date(localStorage.getItem('selectedDate') || new Date()).toISOString().split('T')[0]);
    const [openModalPay, setOpenModalPay] = useState(false);
    const [payAmount, setPayAmount] = useState(null);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [MontoDebe, setMontoDebe] = useState();
    const [ModalStudent, setModalStudent] = useState(false);
    const [ModalReporte, setModalReporte] = useState(false);
    const [InputReporte, setInputReporte] = useState('');
    const {contextId, setContextId, user, setUser} = useIdContext()

    const debeDinero = async () => {
        if (!currentStudentId) return;
        const pagosActivos = currentStudentId.pagos.filter(pago => pago.activo === true);
        const cantidadPagos = pagosActivos.length;
        const sumaDeTodosLosPagos = pagosActivos.reduce((total, pago) => total + parseFloat(pago.monto), 0);
        const montoBase = currentStudentId.rol === 'Estudiantes' ? 600 : 1000;
        const montoDebe = (cantidadPagos * montoBase) - sumaDeTodosLosPagos;
        setMontoDebe(montoDebe);
    };

    const handlePutWithReport = async () => {
        const fecha = new Date(localStorage.getItem('selectedDate'));
        const fechaFormato = fecha.toLocaleDateString('en-CA');
        const hora = new Date().toISOString();

        const pagoExistente = currentStudentId.pagos.find(pago => pago.fecha_pago_prueba === selectedDate && pago.activo);

        if (pagoExistente) {
            await putAsistencia(pagoExistente.id_pago, {
                reporte: InputReporte,
                fecha_desactivado: fechaFormato,
                hora: hora,
                activo: false
            });

            const updatedStudents = Students.map(s =>
                s.id === currentStudentId.id ? {
                    ...s,
                    pagos: s.pagos.filter(pago => pago.id_pago !== pagoExistente.id_pago)
                } : s
            );
            setStudents(updatedStudents);
            setModalReporte(false);
        }
    };

    useEffect(() => {
        debeDinero();
    }, [currentStudentId]);

    const obtainStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
            setAllStudents(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const validAlmuerzo = (student) => {
        return student.pagos.some(pago => pago.fecha_pago_prueba === selectedDate && pago.activo);
    };

    const validarAsistencias = async (student) => {
        const fecha = new Date(localStorage.getItem('selectedDate')).toLocaleDateString('en-CA');
        const pagoExistente = student.pagos.find(pago => pago.fecha_pago_prueba === selectedDate && pago.activo);

        if (pagoExistente) {
            setModalReporte(true);
            setCurrentStudentId(student);
            setContextId(student.id)
        } else {
            if (student.becado) {
                const monto = student.rol === 'prof' ? 1000 : student.becado ? 0 : 600;

                const newRegistro = {
                    estudiante_id: student.id,
                    fecha_pago_prueba: fecha,
                    monto: monto
                };

                await postAsistencia(newRegistro);
                const updatedStudents = Students.map(s =>
                    s.id === student.id ? {
                        ...s,
                        pagos: [...s.pagos, { id_pago: newRegistro.id_pago, fecha_pago_prueba: fecha }]
                    } : s
                );
                setStudents(updatedStudents);
                obtainStudents();
            } else {
                setCurrentStudentId(student);
                setContextId(student.id)
                setOpenModalPay(true);
            }
        }
    };

    const handlePayment = async () => {
        if (payAmount >= 0 && currentStudentId) {
            const newRegistro = {
                estudiante_id: currentStudentId.id,
                fecha_pago_prueba: selectedDate,
                monto: payAmount
            };

            await postAsistencia(newRegistro);
            setOpenModalPay(false);
            setPayAmount(null);
            obtainStudents();
        }
        debeDinero();
    };

    const filterStudents = () => {
        if (InputFiltro === '') {
            setStudents(allStudents);
        } else {
            const filtro = allStudents.filter(student =>
                student.nombre.toLowerCase().includes(InputFiltro.toLowerCase())
            );
            setStudents(filtro);
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        obtainStudents();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = new Date(localStorage.getItem('selectedDate')).toISOString().split('T')[0];
            if (newDate !== selectedDate) {
                setSelectedDate(newDate);
                obtainStudents();
            }
        }, 30);
        return () => clearInterval(interval);
    }, [selectedDate]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            filterStudents();
        }
    };

    const handlePayEnter = (e) => {
        if (e.key === 'Enter') {
            handlePayment();
        }
    };

    const handleSendReport = (e) => {
        if (e.key === 'Enter') {
            handlePutWithReport();
            setInputReporte('')
        }
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = Students.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(Students.length / studentsPerPage);

    return (
        <div className='containerAll'>
            <div className="containerFormStock">
                <input
                    type="text"
                    className='search_input'
                    value={InputFiltro}
                    onChange={(e) => setInputFiltro(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar Estudiantes ..."
                />
            </div>
            <div className="containerStock">
                <div className="tittles">
                    <div>ID</div>
                    <div>Nombre</div>
                    <div>Sección</div>
                    <div>Rol</div>
                    <div>Almuerzo</div>
                    <div className='perfilIcon'>Perfil</div>
                </div>
                <div className='students'>
                    {loading ? (
                        <div className='loading'>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress size="80px" />
                            </Box>
                        </div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        currentStudents.map((student) => (
                            <div key={student.id} className="student">
                                <div className='TableStudentsID'>{student.id}</div>
                                <div>
                                    <div className="name_s">{student.nombre}</div>
                                    <div className="cedula_s">{student.cedula}</div>
                                </div>
                                <div className='seccion_s'>{student.seccion}</div>
                                <div>{student.rol}</div>
                                <div className='almuerzoIcon'>
                                    {validAlmuerzo(student) ?
                                        <div onClick={() => validarAsistencias(student)}><LocalDiningIcon className='almorzado_S' style={{ fontSize: 27 }} /></div> :
                                        <div onClick={() => validarAsistencias(student)}><NoMealsIcon className='almorzado_N' style={{ fontSize: 27 }} /></div>
                                    }
                                </div>
                                <div className="actionsIcon">
                                    <div onClick={() => (setModalStudent(true), setCurrentStudentId(student), setContextId(student.id))} className='contAction'><MoreVertIcon style={{ color: 'gray' }} /></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Mini Modal para el pago */}
            {openModalPay && (
                <div className='modalPayContainer'>
                    <div className='modalPay'>
                        <div className='buttonCancelModalPay' onClick={() => setOpenModalPay(false)}>X</div>
                        <div className='nameModalPay'>{currentStudentId.nombre}</div>
                        <div className='rolModalPay'>{currentStudentId.rol === 'Estudiantes' ? 'Estudiante' : 'Profesor'}</div>
                        <div className='infoDebePagosModalPay'>
                            <div>
                                <div className='debeModalPay'>{MontoDebe < 0 ? 'Saldo:' : 'Debe:'}</div>
                                <div className='montoModalPay'>{Math.abs(MontoDebe)} </div>
                            </div>
                            <div>
                                <div className='debeModalPay'>Pago necesario: </div>
                                <div className='montoModalPay'>{(MontoDebe + (currentStudentId.rol === 'Estudiantes' ? 600 : 1000)) < 0 ? 0 : MontoDebe + (currentStudentId.rol === 'Estudiantes' ? 600 : 1000)}</div>
                            </div>
                        </div>
                        <input
                            className='inputModalPay'
                            type="number"
                            placeholder='Monto'
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            autoFocus
                            onKeyDown={handlePayEnter}
                        />
                    </div>
                </div>
            )}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            {ModalStudent && (
                currentStudentId.rol == 'Estudiantes' ? 
                <div className="containerModalStudent">
                    <div className="modalStudent">
                        <div className='closeModalStudent' onClick={() => setModalStudent(false)}>X</div>
                        <div className="modalStudent_nombre_seccion">
                            <div className='ModalStudent_name'>{currentStudentId.nombre}</div>
                            <div>{currentStudentId.seccion}</div>
                        </div>
                        <div className="modalStudent_rol_becado">
                            <div className='ModalStudent_rol'>Estudiante</div> 
                            <div>{currentStudentId.becado ? 'Becado' : 'No becado'}</div>
                        </div>
                        <div className='ModalStudent_calendario'>
                            <div style={{ marginTop: '10%'}}>Asist. semanal:</div>
                            <CalendarioStudent/>
                        </div>
                        <div className='ModalStudentChart'>
                            <SessionsChartStudents/>
                        </div>
                    </div>
                </div> :
                <div className="containerModalStudent">
                    <div className="modalStudent">
                        <div className='closeModalStudent' onClick={() => setModalStudent(false)}>X</div>
                        <div className='ModalStudent_name'>{currentStudentId.nombre}</div>
                        <div>Profesor</div>
                        <div className='ModalStudent_calendario'>
                            <div style={{ marginTop: '10%'}}>Asist. semanal:</div>
                            <CalendarioStudent/>
                        </div>
                        <div className='ModalStudentChart'>
                            <SessionsChartStudents/>
                        </div>
                    </div>
                </div>
            )}
            {ModalReporte && (
                <div className="containerModalReporte">
                    <div className="modalReporte">
                        <div className='closeModalReporte' onClick={() => setModalReporte(false)}>X</div>
                        <div className="containerAdvertenciaReporte">
                            <div style={{fontSize: 45}}><ReportGmailerrorredIcon/></div>
                            <div>Cuando se elimina un pago, es necesario hacer un reporte explicando la razón.</div>
                        </div>
                        <input 
                            className='inputModalReporte'
                            type="text"
                            value={InputReporte}
                            onChange={(e) => setInputReporte(e.target.value)}
                            required
                            autoFocus
                            placeholder='Reporte'
                            onKeyDown={handleSendReport}
                        />
                        <div style={{fontSize: 12}}>Razones comunes: Toque accidental, Error de pago, Confusión de persona.</div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default StockComponent;
