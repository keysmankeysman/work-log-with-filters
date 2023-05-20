let btnFilter = document.querySelector('.btn-filter'),
	hideMenu = document.querySelector('.hide-menu'),
	allWorkers = document.querySelectorAll('.table-worker'),
	inputSearch = document.querySelector('#searchByName'),
	allRow = document.querySelectorAll('.table-body')
	// checkboxes = document.querySelectorAll('input[name="status"]:checked');
	checkboxes = document.querySelectorAll('input[name="status"]');


// let selectedStatuses = ['inwork', 'stop', 'rework', 'verified', 'done']
let selectedStatuses = []
let positionName = 2

const statuses = {
	execute: 'Выполнение',
	allHistory: 'Вся история',
	onlyWork: 'Только в работе'
}

checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', () => {
		switch(checkbox.value) {
			case 'execute':  
				executeFilter()
			break
			case 'allHistory': 
				allHistoryFilter()
			break
			case 'onlyWork':
				onlyWorkFilter()
			break
		  }
	})
})

function init() {
	// executeFilter()
	onlyWorkFilter()
}

function executeFilter() {
	let statuses1 = ['В работе','Переделка']
	let statuses2 = ['Проверено','Пройдено']
	allWorkers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		innerBody.forEach((body, index) => {
			let lastIndexRow = index + 1 === innerBody.length
			if (lastIndexRow) {
				let currentStatus = body.querySelector('.table-body__status').innerHTML
				if (statuses1.includes(currentStatus)) {
					innerBody.forEach((body) => {
						let twoStatus = body.querySelector('.table-body__status').innerHTML
						if (!statuses1.includes(twoStatus)) {
							body.classList.add('hidden')
						}
					})
				} else if (statuses2.includes(currentStatus)) {
					innerBody.forEach((body) => {
						let twoStatus = body.querySelector('.table-body__status').innerHTML
						if (statuses1.includes(twoStatus)) {
							body.classList.add('hidden')
						}
					})
				} else {

				}
			}
		})
	})
}



let allTasks = getAllTasks()

function allHistoryFilter() {
	console.log('allHistoryFilter')
	console.log('allWorkers', allWorkers)

	allRow.forEach(row => {
		row.classList.remove('hidden')
	})


	// allWorkers.forEach(el => {
	// 	let innerBody = el.querySelectorAll('.table-body')
	// 	console.log('innerBody', innerBody)
	// 	innerBody.forEach((body) => {
	// 		body.classList.remove('hidden')
	// 	})
	// })
}


// 1.Список всех тасков
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
	let result = tasks.map(el => el.split('.')[positionName])
	let uniqueArray = result.filter(function(item, pos) {
		return result.indexOf(item) == pos
	})
	return uniqueArray
}

// 2.Получение списка нод по каждой таске

let oneTask = 'Проверка торцевых и радиальных биений опор для обеспечения соосности опор и подбор регулировочных шайб'

function getRowsListByTask(oneTask) {
	let arr = [...allRow]
	let result = arr.filter(el => {
		if (el.querySelector('.table-body__step') !== null) { 
			return el.querySelector('.table-body__step').innerHTML.includes(oneTask)
	 	} 
	})
	return result
}

console.log(allTasks)
console.log('перед циклом')

// arr - массив объектов с нодами row
let arr = []
for (let i = 0; i < allTasks.length; i++) {
	let result = getRowsListByTask(allTasks[i])

	let obj = {
		id: i+1,
		name: allTasks[i],
		rows: result
	}

	arr.push(obj)
}

function getStatuses() {
	arr.forEach((el,index) => {
		el.rows.forEach((row, indx) => {
			let currentStatus = row.querySelector('.table-body__status').innerHTML 
			let currentEnd = row.querySelector('.table-body__end').innerHTML 
			if (currentStatus === 'В работе' && currentEnd === '' || currentStatus === 'Переделка'  && currentEnd === '') {
				arr[index].statusInwork = true
				arr[index].statusInworkIndex = indx
			}
		})
	})
}

console.log('ARR:', arr)

getStatuses()

function checkStatus() {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].statusInwork) {
			arr[i].rows.forEach(el => el.classList.add('hidden'))
			// arr[i].rows[arr[i].rows[]]
			// console.log(arr[i].statusInworkIndex)
			arr[i].rows[arr[i].statusInworkIndex].classList.remove('hidden')
		} 

	}
}

checkStatus()


// скрыть всех воркеров, которые не имеют итемов
function hideEmptyWorkers() {
	console.log('hideEmptyWorkers')
	let workers = [...allWorkers]
	
	workers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		let count = 0
		console.log(innerBody)
		innerBody.forEach(row => {
			if (row.classList.contains('hidden')) {
				count++
			}
		})
		if (count === innerBody.length) {
			el.classList.add('hidden')
		}
	})
}
hideEmptyWorkers()


getRowsListByTask(oneTask)

// только в работе, показывать статусы "В работе" и "Переделка" - старый вариант
function onlyWorkFilter() {

	// allTasks.forEach((task, index) => {
	// 	console.log('проход #', index + 1)
	// 	console.log('task', task)
	// 	let statusInwork = null

	// 	allRow.forEach(row => {
	// 		if (row.querySelector('.table-body__step') !== null) {
	// 			let currentStatus = row.querySelector('.table-body__status').innerHTML 
	// 			let currentEnd = row.querySelector('.table-body__end').innerHTML 
	// 			console.log('row:', row)
	// 			console.log(currentStatus === 'В работе')
	// 			console.log(currentEnd === '')
	// 			console.log(currentStatus === 'В работе' && currentEnd === '')
	// 			if (currentStatus === 'В работе' && currentEnd === '') {
	// 				statusInwork++
	// 			}
	// 		}
	// 	})
	// 	console.log(statusInwork)

	// })




	// allTasks.forEach(task => {
	// 	allRow.forEach(row => {
	// 		if (row.querySelector('.table-body__step') !== null) {
	// 			let currentStatus = row.querySelector('.table-body__status').innerHTML 
	// 			let currentEnd = row.querySelector('.table-body__end').innerHTML 

	// 			// проверка в работе и не окончено
	// 			if (currentStatus === 'В работе' && currentEnd === '') {
	// 				row.classList.remove('hidden')
	// 			}

	// 			// проверка переделка и не окончено
	// 			if (currentStatus === 'Переделка' && currentEnd === '') {
	// 				row.classList.remove('hidden')
	// 			}

	// 			// проверка на статусы Остановка и Возобновлено (всегда показывать)
	// 			if (row.classList.contains('table-body__renewal') || currentStatus === 'Остановка') {
	// 				row.classList.remove('hidden')
	// 			} 
	// 		}
	// 	})
	// })
}



// только в работе, показывать статусы "В работе" и "Переделка" - старый вариант
// function onlyWorkFilter() {
// 	let statuses = ['В работе','Переделка']
// 	allWorkers.forEach(el => {
// 		let innerBody = el.querySelectorAll('.table-body')
// 		innerBody.forEach((body) => {
// 			let currentStatus = body.querySelector('.table-body__status').innerHTML
// 			if (!statuses.includes(currentStatus)) {
// 				body.classList.add('hidden')
// 			}
// 		})
// 	})
// }




// checkboxes.forEach(checkbox => {
// 	checkbox.addEventListener('click', () => {
// 		if (selectedStatuses.includes(checkbox.value)) {
// 			if (!selectedStatuses.length) {
// 				showAllTableBody()
// 			} else {
// 				showCurrenTableBody(checkbox.value)
// 			}
// 			let index = selectedStatuses.findIndex(el => el === checkbox.value)
// 			selectedStatuses.splice(index, 1)
// 		} else {
// 			selectedStatuses.push(checkbox.value)
// 			filterStatus(checkbox.value) 
// 		}
// 	})
// })

// открытие меню фильтра
btnFilter.addEventListener('click', () => {
	if (hideMenu.classList.contains('hidden')) {
		hideMenu.classList.remove('hidden')
	} else {
		hideMenu.classList.add('hidden')
	}

})

// function showAllWorkers () {
// 	allWorkers.forEach(worker => {
// 		worker.classList.remove('hidden')
// 	})
// }

// function filterStatus(value) {
// 	allWorkers.forEach(el => {
// 		let innerBody = el.querySelectorAll('.table-body')
// 		innerBody.forEach((body) => {
// 			if (body.querySelector('.table-body__status').innerHTML === statuses[value]) {
// 				body.classList.add('hidden')
// 			}
// 		})
// 	})
// }

function showAllTableBody () {

}

// function showCurrenTableBody (value) {

// 	allWorkers.forEach(el => {
// 		let innerBody = el.querySelectorAll('.table-body')
// 		innerBody.forEach((body) => {
// 			console.log(body)
// 			if (body.querySelector('.table-body__status').innerHTML === statuses[value]) {
// 				body.classList.remove('hidden')
// 			}
// 		})
// 	})
// }

	


init()