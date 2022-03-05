
const headerBtn = document.querySelector(".header__btn")

const popup3 = document.querySelector(".popup3")
const popup3Form = document.querySelector(".popup3__form")

const popup = document.querySelector('.popup')
const elemPopup2 = document.querySelector('.popup2')
const popupСontent = document.querySelector('.popup__content')
const popupСontent2 = document.querySelector('.popup2__content')
const popup2Button = popupСontent2.querySelector('.popup2__button')
const popup2Form = document.querySelector(".popup2__form")
const popupImg = document.querySelector(".popup__img")

const popupTitle = popupСontent.querySelector('.popup__title')

const popupSubtitle = popupСontent.querySelector('.popup__subtitle')
const popupText = popupСontent.querySelector('.popup__text')


const popup2Rate = popupСontent.querySelector('.popup2__rate')
const popup2ImgLink = popupСontent.querySelector('.popup2__img_link')




let rate = 0
let id = 0



let lastId = 0

// получение наибольшего id карточки
function getLastId (arr){
	let num = 0
	arr.forEach(e => {
		if (e.id > num) {
			num = e.id
		}
	})
	//console.log(num);
	return num
}





// обновить данные на сервере и localStorage
 async function main() {
	await fetch("https://sb-cats.herokuapp.com/api/show")
		.then(response => response.json())
		.then((data) => {
			//getCard(data.data);
			
			//let lastId =  getCard(data.data, callback)
			//console.log(lastId);
			//console.log(data.data);
      	lastId = getLastId(data.data)
			let boxcat = data.data.filter(e => typeof e.img_link === "string" && typeof e.id === "number")
			//console.log(boxcat);
      
			//  if (!localStorage.getItem('storageObjCats')) {
			// 	localStorage.setItem("storageObjCats", JSON.stringify(boxcat))
			//  }
			// boxcat = JSON.parse(localStorage.getItem('storageObjCats'));

			
			//popup2('.header__btn')
			createCatsCards(boxcat)
			creatingFillingPopup(boxcat)
			
		})
}
main()

			

			//transferDataEditForm()





//передать данные из формы редактирования / transmit data from the form
function transferDataEditForm() {
	document.querySelector(".popup3__form").addEventListener("submit", (e) => {
		e.preventDefault();
		let form = document.querySelector(".popup3__form");
		//if (!popup2Form.classList.contains("_add")) {
				obj.id = id
				obj.name = form.elements.name.value;
				obj.description = form.elements.description.value;
				obj.age = form.elements.age.value;
				obj.rate = form.elements.rate.value;
				obj.img_link = form.elements.img_link.value;
				
			 //console.log(obj);
			form.reset();
			//console.log("transferDataEditForm");
			document.querySelector(".cats__container").innerHTML = "";
			editCatFetch ()
			//elemPopup2.classList.remove('_active')
			popup3.classList.remove("_active")
			popup.classList.remove("_active")
			document.body.style.overflow ="visible"
		//}
	});
}
// Запрос редактировать карточку кота на сервере
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
	main()
	//console.log('editCatFetch');
})
}

transferDataEditForm()




function transferDataForms() {
	document.querySelector(".popup2__form").addEventListener("submit", (e) => {
		e.preventDefault();
		let form = document.querySelector(".popup2__form");
		//if (popup2Form.classList.contains("_add")) {
			
		if (
			form.elements.name.value.trim() !== "" &&
			form.elements.age.value.trim() !== "" &&
			form.elements.description.value.trim() !== "" &&
			form.elements.img_link.value.trim() !== "" &&
			form.elements.rate.value.trim() !== "" 
		) {
			obj.name = form.elements.name.value;
			obj.age = form.elements.age.value;
			obj.description = form.elements.description.value;
			obj.img_link = form.elements.img_link.value;
			obj.rate = form.elements.rate.value;
			console.log(lastId);
			obj.id = lastId + 1;
			lastId++
			form.reset();
			document.querySelector(".cats__container").innerHTML = "";
			addCatFetch ()
			elemPopup2.classList.remove('_active')
		}
		//} 
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
		main()
	})
}

transferDataForms()







//================			Создание карточек с котами/ Creating cards with cats			========================================================================================================================================

function createCatsCards(cats) {
  cats.forEach(function (item, index) {
    document.querySelector(
      ".cats__container"
    ).innerHTML += `	<div class="cats__card card" data-name = "${item.id}" data-rate = "${item.rate}">
		<div class="card__content">
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
						rate = el.currentTarget.getAttribute("data-rate");
						console.log("id" +" "+ id);
						console.log("rate" +" "+ rate);
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
	
}


// удаляем кота на сервере
popupСontent.addEventListener('click',(e)=>{
	if (e.target.classList.contains("popup__del")) {
		if (confirm('Отпустить котика погулять с волками')) {
			deleteCat(e)
			popup.classList.remove('_active')
			document.body.style.overflow ="visible"
		} 
		
		//console.log(e.target.parentNode.parentNode);
		
	}
})
function deleteCat(e){
	//let id = e.target.parentNode.parentNode.getAttribute('data-name');
	fetch(`https://sb-cats.herokuapp.com/api/delete/${id}`, {
			method: 'DELETE'
		})
		.then(res => {
			if (res.ok) {
				localStorage.clear();
				document.querySelector(".cats__container").innerHTML = "";
				main()
			}
			//return Promise.reject(res)
		})
}



//  создание фун открыть - закрыть popup / Open - Close Popup
function popupClose () {
	popup.addEventListener('click', (e => {
	if (e.target.classList.contains("cats__popup") || e.target.classList.contains('popup__close')) {
		popup.classList.remove("_active")
		document.body.style.overflow = "visible"
		//popup2Button.innerText = 'Создать'
		// popup2Form.classList.add("_add")
		// elemPopup2.classList.remove("_edit")
	}
}))
}
popupClose ()

function popupClose2 () {
	elemPopup2.addEventListener('click', (e => {
	if (e.target.classList.contains("popup2") || e.target.classList.contains('popup2__close')) {
		elemPopup2.classList.remove("_active")
		document.body.style.overflow = "visible"
		
	}
}))
}
popupClose2 ()

function popupClose3 () {
	popup3.addEventListener('click', (e => {
	if (e.target.classList.contains("popup3") || e.target.classList.contains('popup3__close')) {
		popup3.classList.remove("_active")
		document.body.style.overflow = "visible"
	}
}))
}

popupClose3 ()




// модифицируем popup2 для редактирования
popupСontent.querySelector('.popup__edit').addEventListener("click", (e)=>{
	popup3.classList.add('_active')
	document.body.style.overflow = "hidden"
	// elemPopup2.classList.remove("_add")
	// elemPopup2.classList.add('_edit')
	let form = popup3Form
	form.elements.name.value = popupTitle.innerText;
	 form.elements.age.value = parseInt(popupSubtitle.innerText.match(/\d+/)) 
	 form.elements.description.value = popupText.innerText;
	form.elements.img_link.value = popupImg.getAttribute('src');
	form.elements.rate.value = rate
	
})



// обновить по кнопке в шапке
document.querySelector('.header__btn-refresh').addEventListener('click', () => {
	localStorage.clear();
	document.querySelector(".cats__container").innerHTML = "";
	main()
})


headerBtn.addEventListener('click', () => {
	elemPopup2.classList.add("_active")
})

console.log('4');
