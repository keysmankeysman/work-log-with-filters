let btnName = document.querySelector('#btn-name'),
	btnFilter = document.querySelector('.btn-filter'),
	hideMenu = document.querySelector('.hide-menu'),
	allWorkers = document.querySelectorAll('.table-worker'),
	inputSearch = document.querySelector('#searchByName'),
	// checkboxes = document.querySelectorAll('input[name="status"]:checked');
	checkboxes = document.querySelectorAll('input[name="status"]');


// let selectedStatuses = ['inwork', 'stop', 'rework', 'verified', 'done']
let selectedStatuses = []

const statuses = {
	inwork: 'В работе',
	stop: 'Остановлено',
	rework: 'Переделка',
	verified: 'Проверено',
	done: 'Пройден',
}

checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', () => {
		if (selectedStatuses.includes(checkbox.value)) {
			if (!selectedStatuses.length) {
				showAllTableBody()
			} else {
				showCurrenTableBody(checkbox.value)
			}
			let index = selectedStatuses.findIndex(el => el === checkbox.value)
			selectedStatuses.splice(index, 1)
		} else {
			selectedStatuses.push(checkbox.value)
			filterStatus(checkbox.value) 
		}
	})
})

btnName.addEventListener('click', () => {
	if (inputSearch.value) {
		allWorkers.forEach(worker => {
			// let innerCaption = worker.querySelector('.table-caption')
			let innerCaptionHTML = worker.querySelector('.table-caption').innerHTML
			if (innerCaptionHTML.includes(inputSearch.value)) {
				worker.classList.add('hidden')
			}
		})
	} else {
		showAllWorkers()
	}
})

btnFilter.addEventListener('click', () => {
	if (hideMenu.classList.contains('hidden')) {
		hideMenu.classList.remove('hidden')
	} else {
		hideMenu.classList.add('hidden')
	}

})

function showAllWorkers () {
	allWorkers.forEach(worker => {
		worker.classList.remove('hidden')
	})
}

function filterStatus(value) {
	allWorkers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		innerBody.forEach((body) => {
			if (body.querySelector('.table-body__status').innerHTML === statuses[value]) {
				body.classList.add('hidden')
			}
		})
	})
}

function showAllTableBody () {
	allWorkers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		innerBody.forEach((body) => {
			body.classList.remove('hidden')
		})
	})
}

function showCurrenTableBody (value) {

	allWorkers.forEach(el => {
		let innerBody = el.querySelectorAll('.table-body')
		innerBody.forEach((body) => {
			console.log(body)
			if (body.querySelector('.table-body__status').innerHTML === statuses[value]) {
				body.classList.remove('hidden')
			}
		})
	})
}

	


