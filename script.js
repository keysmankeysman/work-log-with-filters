let btnFilter = document.querySelector('.btn-filter'),
	hideMenu = document.querySelector('.hide-menu'),
	allWorkers = document.querySelectorAll('.table-worker'),
	inputSearch = document.querySelector('#searchByName'),
	allRow = document.querySelectorAll('.table-body')
	// checkboxes = document.querySelectorAll('input[name="status"]:checked');
	checkboxes = document.querySelectorAll('input[name="status"]');


// let selectedStatuses = ['inwork', 'stop', 'rework', 'verified', 'done']
let selectedStatuses = []
// let selectedStatuses = []

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
	// onlyWorkFilter()
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
console.log('allTasks', allTasks)

function allHistoryFilter() {
	allWorkers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		innerBody.forEach((body) => {
			body.classList.remove('hidden')
		})
	})
}



function getAllTasks() {
	let tasks = []

	let allRow = document.querySelectorAll('.table-body')
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


// только в работе, показывать статусы "В работе" и "Переделка" - старый вариант
function onlyWorkFilter() {

	console.log('onlyWorkFilter')
	console.log('allTasks', allTasks)

	allTasks.forEach(task => {
		// console.log(task)
		allRow.forEach(row => {
			let currentStep = row.querySelector('.table-body__step').innerHTML 
			if (currentStep.includes(task)) {
				console.log('!!!Task:', task)
			}
		})
	})


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