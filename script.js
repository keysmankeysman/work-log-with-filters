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
			})
		})
	}
	checkStatusWorkers()
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
		let result = tasks.map(el => el.split('.')[positionName])
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
}


function init() {
	// executeFilter()
	getData()
	onlyWorkFilter()
}

function checkStatusWorkers() {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].statusInwork) {
			arr[i].rows.forEach(el => el.classList.add('hidden'))
			arr[i].rows[arr[i].statusInworkIndex].classList.remove('hidden')
		} 
	}
}

// ОСТАЛЬНЫЕ ФУНКЦИИ 


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