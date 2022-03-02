 const popupСontent = document.querySelector('.popup__content')
 const popupСontent2 = document.querySelector('.popup2__content')
 const popup2Button = popupСontent2.querySelector('.popup2__button')
 const popup2Form = document.querySelector(".popup2__form")
 const popupTitle = popupСontent.querySelector('.popup__title')
 let id = 0



let lastId = 0
// .filter(e => typeof e.img_link === "string")
async function getLastId() {
	await fetch("https://sb-cats.herokuapp.com/api/show")
		.then((response) => response.json())
		.then((data) => {
			arr = data.data.filter(e => typeof e.img_link === "string")
			lastId =  getCard(arr);
			console.log(lastId);
		});
}
getLastId()

// получение наибольшего id карточки
function getCard (arr){
	let num = 0
	arr.forEach(e => {
		if (e.id > num) {
			num = e.id
		}
	})
	//console.log(num);
	return num
}






 async function f1() {
	await fetch("https://sb-cats.herokuapp.com/api/show")
		.then(response => response.json())
		.then((data) => {
			//getCard(data.data);
			
			//let lastId =  getCard(data.data, callback)
			//console.log(lastId);
			//console.log(data.data);
			let boxcat = data.data.filter(e => typeof e.img_link === "string")
			//console.log(boxcat);

			// if (!localStorage.getItem('storageObjCats')) {
			// 	localStorage.setItem("storageObjCats", JSON.stringify(objCats))
			// }
			// let boxcat = JSON.parse(localStorage.getItem('storageObjCats'));

			transferDataForms(addCatFetch)
			popup2('.header__btn')
			createCatsCards(boxcat)
			creatingFillingPopup(boxcat)
			
		})
}
f1()





transferDataForms2(editCatFetch)

// передать данные из формы / transmit data from the form
function transferDataForms2(callback) {
	document.querySelector(".popup2__form").addEventListener("submit", (e) => {
		e.preventDefault();
		let form = document.querySelector(".popup2__form");
		 
			obj.name = form.elements.name.value;
			obj.age = form.elements.age.value;
			//obj.id = form.elements.id.value;
			obj.description = form.elements.description.value;
			obj.rate = form.elements.rate.value;
			obj.img_link = form.elements.img_link.value;
			// console.log(lastId);
			// obj.id = lastId + 1;
			// lastId++
			form.reset();
			callback()
		
	});
}

async function editCatFetch (){
	await fetch(`https://sb-cats.herokuapp.com/api/update/${id}`, {
	method: "PUT",
	headers: {
		'Content-Type': 'application/json' // не ставить заголовок Referer
	},
	body: JSON.stringify(obj)
})
.then(() =>{
	localStorage.clear();
	document.querySelector(".cats__container").innerHTML = "";
	f1()
})
}






function transferDataForms(callback) {
	document.querySelector(".popup2__form").addEventListener("submit", (e) => {
		e.preventDefault();
		if (popup2Form.classList.contains("_add")) {
			let form = document.querySelector(".popup2__form");
		if (
			form.elements.name.value.trim() !== "" &&
			form.elements.age.value.trim() !== ""
		) {
			obj.name = form.elements.name.value;
			obj.age = form.elements.age.value;
			//obj.id = form.elements.id.value;
			obj.description = form.elements.description.value;
			obj.img_link = form.elements.img_link.value;
			obj.rate = form.elements.rate.value;
			console.log(lastId);
			obj.id = lastId + 1;
			lastId++
			form.reset();
			callback()
			//addCatFetch()
		}
		}
		
	});
}

// Запрос добавить карточку кота на сервер
 async function addCatFetch (){
		await fetch('https://sb-cats.herokuapp.com/api/add', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json' // не ставить заголовок Referer
		},
		body: JSON.stringify(obj)
	})
	.then(() =>{
		localStorage.clear();
		document.querySelector(".cats__container").innerHTML = "";
		f1()
	})
}







// Открыть - закрыть pопап2 / Open - Close popup2
 function popup2 (findClass){
	document.querySelector(findClass).addEventListener('click', () =>{
		document.querySelector('.popup2').classList.add("_active")
	})
	popupClose ("popup2","popup2__close")
}

//================			Создание карточек с котами/ Creating cards with cats			========================================================================================================================================

function createCatsCards(cats) {
  cats.forEach(function (item, index) {
    document.querySelector(
      ".cats__container"
    ).innerHTML += `	<div class="cats__card card" data-name = "${item.id}">
		<div class="card__content">
		<div class="card__del">Del</div>
			<div class="card__box-img">
				<img src="${item.img_link}" class="card__img" alt="">
			</div>
			<div class="card__name">${item.name}</div>
			<div class="card__rate"></div>
		</div>
	</div> `;
    let cardRate = document.querySelectorAll(".card__rate");
   // console.log(cardRate[index]);
    for (let indexx = 0; indexx < 10; indexx++) {
    	if (item.rate > indexx) {
    		cardRate[index].innerHTML += '<img src="https://sb-cats.herokuapp.com/img/cat-fill.svg" class="imgcats" alt="^_^">'
    	} else {
    		cardRate[index].innerHTML += '<img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">'
    	}
    }
  });
}

//========================================================================================================================================================


//===================			Создание и передача данных в popup / Creating and transferring data to Popup			===================================================================================================================================

function creatingFillingPopup(cats) {
	let card = document.querySelectorAll('.card')
	let ageCat = ""
	//console.log(card);
	card.forEach(e => {
		//console.log(e.getAttribute("data-name"));
		e.addEventListener('click', (el => {
			
			if (!el.target.classList.contains("card__del")) {
				cats.forEach(item => {
					//console.log(el.currentTarget.getAttribute("data-name"));
					if (el.currentTarget.getAttribute("data-name") * 1 === item.id) {
						//console.log(el.currentTarget.getAttribute("data-name"));
						if (item.age === 1) {
							ageCat = "Год"
						} else if (item.age === 2 || item.age === 3 || item.age === 4) {
							ageCat = "Годa"
						} else {
							ageCat = "Лет"
						}
						document.querySelector('.popup').classList.add("_active")
						document.querySelector('.popup__img').setAttribute('src', item.img_link)
						document.querySelector('.popup__title').innerText = item.name
						document.querySelector('.popup__subtitle').innerText = item.age + " " + ageCat
						document.querySelector('.popup__text').innerText = item.description
						document.body.style.overflow = "hidden"
						//console.log(el.currentTarget.getAttribute("data-name"));
						id = el.currentTarget.getAttribute("data-name");
						console.log(id);
					}
				})
			}
			
		}))
		// / осветлить рисунок кота при наведении мышы / Lighten the cat drawing when you hover 
		e.addEventListener('mouseenter', (e => {
			e.target.querySelector('.card__img').style.filter = "opacity(100%)"
		}))
		//
		e.addEventListener('mouseleave', (e => {
			e.target.querySelector('.card__img').style.filter = "opacity(60%)"
		}))
	})
	// открыть - закрыть popup / Open - Close Popup
	popupClose ("popup","popup__close")
}


//  создание фун открыть - закрыть popup / Open - Close Popup
function popupClose (popup,close) {
document.querySelector(`.${popup}`).addEventListener('click', (e => {
	if (e.target.classList.contains(popup) || e.target.classList.contains(close)) {
		document.querySelector(`.${popup}`).classList.remove("_active")
		document.body.style.overflow = "visible"
		popup2Button.innerText = 'Создать'
		popup2Form.classList.add("_add")
	}
}))
}




document.querySelector(".cats__container").addEventListener('click',(e)=>{
	if (e.target.classList.contains("card__del")) {
		if (confirm('Отпустить котика погулять с волками')) {
			deleteCat(e)
		} 
		
		//console.log(e.target.parentNode.parentNode);
		
	}
})
// удаляем кота
function deleteCat(e){
	let id = e.target.parentNode.parentNode.getAttribute('data-name');
	fetch(`https://sb-cats.herokuapp.com/api/delete/${id}`, {
			method: 'DELETE'
		})
		.then(res => {
			if (res.ok) {
				document.querySelector(".cats__container").innerHTML = "";
				f1()
			}
			//return Promise.reject(res)
		})
}




popupСontent.querySelector('.popup__edit').addEventListener("click", ()=>{
	popup2Button.innerText = 'Редактировать'
	popup2Form.classList.remove("_add")
	let form = document.querySelector(".popup2__form");
	form.elements.name.value = popupTitle.innerText;
			
			// obj.age = form.elements.age.value;
			// //obj.id = form.elements.id.value;
			// obj.description = form.elements.description.value;
			// obj.rate = form.elements.rate.value;
			// obj.img_link = form.elements.img_link.value;
})

popup2('.popup__edit')

//popup2('.popup__edit')




// obj ={
// 	"id": 32167,
// 	"name": "Доктор Барсик",
// 	"age": 5,
// 	"description": "Характер скверный, не женат."
// }


		// fetch("https://sb-cats.herokuapp.com/api/show")
		// .then(response => response.json())

		// async function f10 (){
		// 	fetch("https://sb-cats.herokuapp.com/api/show")
		// 	.then((res) =>{
		// 		if (res.ok) {
		// 			console.log('1111');
		// 		}
		// 	})
			
		// }
		// f10()

		//  function f2() {
		// 	fetch("https://sb-cats.herokuapp.com/api/show")
		// 		.then(response => response.json())
		// 		.then((data) => {
		// 			//getCard(data.data);
					
		// 			//let lastId =  getCard(data.data, callback)
		// 			//console.log(lastId);
		// 			//console.log(data.data);
		// 			let boxcat = data.data.filter(e => typeof e.img_link === "string")
		// 			//console.log(boxcat);
		
		// 			// if (!localStorage.getItem('storageObjCats')) {
		// 			// 	localStorage.setItem("storageObjCats", JSON.stringify(objCats))
		// 			// }
		// 			// let boxcat = JSON.parse(localStorage.getItem('storageObjCats'));
		
		// 			transferDataForms()
		// 			addCat()
		// 			createCatsCards(boxcat)
		// 			creatingFillingPopup(boxcat)
					
		// 		})
		// }