let btnFilter = document.querySelector('.btn-filter'),
	hideMenu = document.querySelector('.hide-menu'),
	allWorkers = document.querySelectorAll('.table-worker'),
	inputSearch = document.querySelector('#searchByName'),
	allRow = document.querySelectorAll('.table-body')
	// checkboxes = document.querySelectorAll('input[name="status"]:checked');
	checkboxes = document.querySelectorAll('input[name="status"]');


// let selectedStatuses = ['inwork', 'stop', 'rework', 'verified', 'done']
let selectedStatuses = []

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


// ФИЛЬТРЫ - - - - -

// 1 фильтр 
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

// 2 фильтр - показать все
function allHistoryFilter() {
	allRow.forEach(row => {
		row.classList.remove('hidden')
	})
	showAllWorkers() 

}

// 3 фильтр - только в работе, показывать статусы "В работе" и "Переделка" - старый вариант
function onlyWorkFilter() {
	getStatuses()
	function getStatuses() {
		arr.forEach((el,index) => {
			el.rows.forEach((row, indx) => {
				let currentStatus = row.querySelector('.table-body__status').innerHTML 
				let currentEnd = row.querySelector('.table-body__end').innerHTML 
				if (currentStatus === 'В работе' && currentEnd === '' || currentStatus === 'Переделка'  && currentEnd === '') {
					arr[index].statusInwork = true
					arr[index].statusInworkIndex = indx
				}
				if (currentStatus === 'Остановлено' && currentEnd === '') {
					arr[index].statusStop = true
					arr[index].statusStopIndex = indx
				}
			})
		})
	}
	checkStatusWorkers()
	showExceptionsStatus()
	hideEmptyWorkers()
}


let allTasks
let arr = []

function getData() {
	allTasks = getAllTasks()

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
		let result = tasks.map(el => el.split('.')[2])
		let uniqueArray = result.filter(function(item, pos) {
			return result.indexOf(item) == pos
		})
		return uniqueArray
	}

	// 2.Получение списка нод по каждой таске

	function getRowsListByTask(oneTask) {
		let arr = [...allRow]
		let result = arr.filter(el => {
			if (el.querySelector('.table-body__step') !== null) { 
				return el.querySelector('.table-body__step').innerHTML.includes(oneTask)
			} 
		})
		return result
	}

	// arr - массив объектов с нодами row
	
	for (let i = 0; i < allTasks.length; i++) {
		let result = getRowsListByTask(allTasks[i])
		let obj = {
			id: i+1,
			name: allTasks[i],
			rows: result
		}

		arr.push(obj)
	}



	function setStages(arr) {


	}
	setStages(arr)

}

function getFullData() {
	let allTasks = getAllTasks()

	let allRowArr = [...allRow]
	let arrData = []
	for (let i = 0; i < allTasks.length; i++) {
		let result = getRowsListByTask(allTasks[i])
		let obj = {
			id: i+1,
			name: allTasks[i],
			rows: result
		}

		arrData.push(obj)
	}
	console.log('arrData', arrData)
	let result = []
	arrData.forEach(el => {
		let obj = {
			name: el.name
		}
		el.rows.forEach(row => {
			if (row.querySelector('.table-body__step') !== null) { 
				let fullName = row.querySelector('.table-body__step').innerHTML
				// получение этапа, операции, перехода
				// console.log(fullName.split('.')[0])
				let stage = fullName.split('.')[0].slice(6)
				let operation = fullName.split('.')[1].slice(9)
				let transition = fullName.split('.')[3].slice(9)
				console.log('этап', stage)
				
			} 
		})
		result.push(obj)
	})
	console.log(result)
}

function init() {
	getFullData()
	// executeFilter()
	// getData()
	// onlyWorkFilter()
}


// в зависимости от статуса отображать
function checkStatusWorkers() {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].statusStop) {
			arr[i].rows.forEach(el => el.classList.add('hidden'))
			arr[i].rows[arr[i].statusStopIndex].classList.remove('hidden')
			return
		} 
		if (arr[i].statusInwork) {
			arr[i].rows.forEach(el => el.classList.add('hidden'))
			arr[i].rows[arr[i].statusInworkIndex].classList.remove('hidden')
		} 
	}
}

// ОСТАЛЬНЫЕ ФУНКЦИИ 

// показать статусы исключения ОСТАНОВЛЕНО или ВОЗОБНОВЛЕНО
function showExceptionsStatus() {
	allRow.forEach(el => {
		if (el.classList.contains('bg-green-renewal') || el.classList.contains('bg-red-accident')) {
			el.classList.remove('hidden')
		}
	})
} 

// скрыть всех воркеров, которые не имеют итемов
function hideEmptyWorkers() {
	let workers = [...allWorkers]
	
	workers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		let count = 0
		innerBody.forEach(row => {
			if (row.classList.contains('hidden')) {
				count++
			}
		})
		if (count === innerBody.length) {
			el.classList.add('hidden')
		} else {
			el.classList.remove('hidden')
		}
	})
}
hideEmptyWorkers()

function showAllWorkers() {
	let workers = [...allWorkers]
	
	workers.forEach(el => {
		el.classList.remove('hidden')
	})
}

// открытие меню фильтра
btnFilter.addEventListener('click', () => {
	if (hideMenu.classList.contains('hidden')) {
		hideMenu.classList.remove('hidden')
	} else {
		hideMenu.classList.add('hidden')
	}
})

function showAllTableBody () {

}

	

checkStatusWorkers()
init()