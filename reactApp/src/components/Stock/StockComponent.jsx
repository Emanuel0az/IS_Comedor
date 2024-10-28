import React, { useState, useEffect } from 'react';
import { getStudents } from '../../server/S_Stock/S_Stock';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { postAsistencia } from '../../server/Asistencia/PostAsistencia';
import { deleteAsist } from '../../server/Asistencia/deleteAsistencia';
import CalendarioStudent from '../CalendarioStudent/CalendarioStudent';
import SessionsChartStudents from '../GraficaStudents/GraficaStudents';
import '../Stock/StockComponent.css';

const StockComponent = () => {
    const [Students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [InputFiltro, setInputFiltro] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 50;
    const [selectedDate, setSelectedDate] = useState(new Date(localStorage.getItem('selectedDate') || new Date()).toISOString().split('T')[0]);
    const [openModalForStudent, setOpenModalForStudent] = useState(null);
    const [openModalPay, setOpenModalPay] = useState(false);
    const [payAmount, setPayAmount] = useState(null);
    const [currentStudentId, setCurrentStudentId] = useState(null); // Nuevo estado para el ID del estudiante actual

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

    function validAlmuerzo(student) {
        return student.pagos.find(pago => pago.fecha_pago_prueba === selectedDate);
    }

    const openingModal = (studentId) => {
        setTimeout(() => {
            setOpenModalForStudent(studentId);
        }, 1);
    };

    const validarAsistencias = async (student, estudiante_id_id) => {
        const fecha = new Date(localStorage.getItem('selectedDate'));
        const fechaFormato = fecha.toLocaleDateString('en-CA');
        const pagoExistente = student.pagos.find(pago => pago.fecha_pago_prueba === fechaFormato);
        
        if (pagoExistente) {
            await deleteAsist(pagoExistente.id_pago);
            const updatedStudents = Students.map(s =>
                s.id === student.id ? {
                    ...s,
                    pagos: s.pagos.filter(pago => pago.id_pago !== pagoExistente.id_pago)
                } : s
            );
            setStudents(updatedStudents);
        } else {
            if (student.becado) {
                const monto = student.rol === 'prof' ? 1000 : student.becado ? 0 : 600;

                const newRegistro = {
                    estudiante_id: estudiante_id_id,
                    fecha_pago_prueba: fechaFormato,
                    monto: monto
                };

                await postAsistencia(newRegistro);
                const updatedStudents = Students.map(s =>
                    s.id === student.id ? {
                        ...s,
                        pagos: [...s.pagos, { id_pago: newRegistro.id_pago, fecha_pago_prueba: fechaFormato }]
                    } : s
                );
                setStudents(updatedStudents);
                const data = await getStudents();
                setStudents(data);
            } else {
                // Aquí se abre el modal para ingresar el monto
                setCurrentStudentId(student.id);
                setOpenModalPay(true);
            }
        }
    };

    const handlePayment = async () => {
        if (payAmount > 0) {
            const newRegistro = {
                estudiante_id: currentStudentId,
                fecha_pago_prueba: selectedDate,
                monto: payAmount
            };

            await postAsistencia(newRegistro);
            setOpenModalPay(false);
            setPayAmount(null); // Reiniciar el monto después del pago
            obtainStudents(); // Volver a cargar los estudiantes
        }
    };

    const filterStudents = () => {
        if (InputFiltro === '') {
            setStudents(allStudents);
        } else {
            const filtro = allStudents.filter(student => student.nombre.toLowerCase().includes(InputFiltro.toLowerCase()));
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
                />
            </div>
            <div className="containerStock">
                <div className="tittles">
                    <div>ID</div>
                    <div>Nombre</div>
                    <div>Sección</div>
                    <div>Rol</div>
                    <div>Almuerzo</div>
                    <div></div>
                    <div>Perfil</div>
                </div>
                <div className='students'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        currentStudents.map((student) => (
                            <div key={student.id} className="student">
                                <div>{student.id}</div>
                                <div>
                                    <div className="name_s">{student.nombre}</div>
                                    <div className="cedula_s">{student.cedula}</div>
                                </div>
                                <div className='seccion_s'>{student.seccion}</div>
                                <div>{student.rol} Rol</div>
                                <div className='almuerzoIcon'>
                                    {validAlmuerzo(student) ?
                                        <div onClick={() => validarAsistencias(student, student.id)}><LocalDiningIcon className='almorzado_S' style={{ fontSize: 27 }} /></div> :
                                        <div onClick={() => validarAsistencias(student, student.id)}><NoMealsIcon className='almorzado_N' style={{ fontSize: 27 }} /></div>
                                    }
                                </div>
                                <div onClick={() => openingModal(student.id)} className="actionsIcon">
                                    <div className='contAction'><MoreVertIcon style={{ color: 'gray' }} /></div>
                                    {openModalForStudent === student.id ? (
                                        <div className='modalContainer'>
                                            <div className='modalStudentContainer'>
                                                <div className='infoStudentM'>
                                                    <div className='imgStudent'>{/* Aquí va la foto. */}</div>
                                                    <div className='identityStudentM'>
                                                        <div className='containerInfoStudentsModal'>
                                                            <div className='nombreStudentintModal'>{student.nombre}</div>
                                                            <div className='idStudetIntoModal'>ID: {student.id}</div>
                                                        </div>
                                                    </div>
                                                    <div className='typesStudentM'>
                                                        <div className='containerInfoStudentsType'>
                                                            <div className="becadoStudentIntoModal">Becado</div>
                                                            <div className="rolStudentIntoModal">Estudiante</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='AsistAndModal'>
                                                    <div className='asistsTextTittle'>Asistencias</div>
                                                    <div>
                                                        <CalendarioStudent />
                                                    </div>
                                                </div>
                                                <div className='graphicStudent'>
                                                    <SessionsChartStudents />
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mini Modal para el pago */}
            {openModalPay && (
                <div className='modalPayContainer'>
                    <div className='modalPay'>
                        <div>Pago para {currentStudentId}</div>
                        <input 
                            type="number" 
                            placeholder='Monto' 
                            value={payAmount} 
                            onChange={(e) => setPayAmount(e.target.value)} 
                            autoFocus
                            onKeyDown={handlePayEnter}
                        />
                        <button onClick={handlePayment}>Confirmar Pago</button>
                        <button onClick={() => setOpenModalPay(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockComponent;
