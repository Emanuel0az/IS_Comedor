import React, { useState, useEffect } from 'react';
import { getStudents } from '../../server/S_Stock/S_Stock';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { postAsistencia } from '../../server/Asistencia/PostAsistencia';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../Stock/StockComponent.css';

const StockComponent = () => {
    const [Students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [InputFiltro, setInputFiltro] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [customAmount, setCustomAmount] = useState('');
    const [activeStudentId, setActiveStudentId] = useState(null);
    const studentsPerPage = 50;
    const [selectedDate, setSelectedDate] = useState(new Date(localStorage.getItem('selectedDate') || new Date()).toISOString().split('T')[0]);
    const [OpenModal, setOpenModal] = useState(false);

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
        return student.pagos.some(pago => pago.fecha_pago_prueba === selectedDate);
    }

    const openingModal = () => {
        setOpenModal(!OpenModal);
    };

    const handleAmountSubmit = async (student) => {
        const amount = parseFloat(customAmount);
        if (!isNaN(amount)) {
            await envAsistencia(student, student.id, amount);
            setActiveStudentId(null);
            setCustomAmount('');
        }
    };

    const handlePaymentClick = (student) => {
        if (!student.becado) {
            setActiveStudentId(student.id);
        } else {
            // Si es becado, enviar directamente con monto 0
            envAsistencia(student, student.id, 0);
        }
    };

    const handleAmountKeyDown = (e, student) => {
        if (e.key === 'Enter') {
            handleAmountSubmit(student);
        }
    };

    const envAsistencia = async (student, estudiante_id_id, customMonto = null) => {
        let monto;
        if (student.rol === 'prof') {
            monto = 1000;
        } else if (student.becado) {
            monto = 0;
        } else {
            monto = customMonto || 600;
        }

        const fecha = new Date(localStorage.getItem('selectedDate'));
        const newRegistro = {
            estudiante_id: estudiante_id_id,
            fecha_pago_prueba: fecha.toLocaleDateString('en-CA'),
            monto: monto
        };

        await postAsistencia(newRegistro);
        const updatedStudents = Students.map(s =>
            s.id === student.id ? {
                ...s,
                pagos: [...s.pagos, { fecha_pago_prueba: fecha.toLocaleDateString('en-CA') }]
            } : s
        );
        setStudents(updatedStudents);
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

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = Students.slice(indexOfFirstStudent, indexOfLastStudent);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(Students.length / studentsPerPage);

    return (
        <div className="containerAll">
            <div className="containerFormStock">
                <input
                    className="search_input"
                    type="text"
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
                    <div>Becado</div>
                    <div>Perfil</div>
                </div>
                <div className="students">
                    {loading ? (
                        <div className='loading'>
                            <Box sx={{ display: 'flex' }} >
                            <CircularProgress size="80px"/>
                            </Box>
                        </div>
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
                                <div className="seccion_s">{student.seccion}</div>
                                <div>{student.rol}</div>
                                <div className="almuerzoIcon">
                                    {activeStudentId === student.id ? (
                                        <div className="custom-amount-input">
                                            <input
                                                type="number"
                                                value={customAmount}
                                                onChange={(e) => setCustomAmount(e.target.value)}
                                                onKeyDown={(e) => handleAmountKeyDown(e, student)}
                                                placeholder="Monto"
                                                className="amount-input"
                                                autoFocus
                                            />
                                            
                                        </div>
                                    ) : validAlmuerzo(student) ? (
                                        <div onClick={() => handlePaymentClick(student)}>
                                            <LocalDiningIcon className="almorzado_S" style={{ fontSize: 27 }} />
                                        </div>
                                    ) : (
                                        <div onClick={() => handlePaymentClick(student)}>
                                            <NoMealsIcon className="almorzado_N" style={{ fontSize: 27 }} />
                                        </div>
                                    )}
                                </div>
                                <div></div>
                                <div><MoreVertIcon style={{ color: 'gray' }} /></div>
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
        </div>
    );
};

export default StockComponent;