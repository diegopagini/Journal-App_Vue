/** @format */

const months = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const getDayMonthYear = (dateString) => {
	const date = new Date(`${dateString}`);

	return {
		day: date.getDay(),
		month: months.at(date.getMonth()),
		yearDay: `${date.getFullYear()}, ${days.at(date.getDay())}`,
	};
};

export default getDayMonthYear;
