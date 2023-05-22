// получаю массив задач ['Подготовка к сборке','Проверка торцевых и радиальных биений опор для обеспечения соосности опор и подбор регулировочных шайб']
function getAllTasks() {
	let tasks = []

	allRow.forEach(row => {
		if (row.querySelector('.table-body__step') !== null) {
			let currentTask = row.querySelector('.table-body__step').innerHTML
			if (!tasks.includes(currentTask)) {
				tasks.push(currentTask)
			}
		}
	})
	let result = tasks.map(el => el.split('.')[2])
	let uniqueArray = result.filter(function(item, pos) {
		return result.indexOf(item) == pos
	})
	return uniqueArray
}

// получает название задачи и отфильтровывает массив всех строк, оставляя только строки этой задачи
function getRowsListByTask(oneTask) {
	let arr = [...allRow]
	let result = arr.filter(el => {
		if (el.querySelector('.table-body__step') !== null) { 
			return el.querySelector('.table-body__step').innerHTML.includes(oneTask)
		} 
	})
	return result
}