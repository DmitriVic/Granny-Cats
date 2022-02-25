
// .filter(e => typeof e.img_link === "string")
 async function f1() {
	let resp = await fetch("https://sb-cats.herokuapp.com/api/show")
		.then(response => response.json())
		.then((data) => {
			
			
			//getCard(data.data);
			//let lastId = getCard(data.data)
			//let lastId = Math.floor(Math.random() * 100)
			//console.log(lastId);
			let boxcat = data.data
			//console.log(boxcat);

			// if (!localStorage.getItem('storageObjCats')) {
			// 	localStorage.setItem("storageObjCats", JSON.stringify(objCats))
			// }

			// let boxcat = JSON.parse(localStorage.getItem('storageObjCats'));

			
			addCat()
			createCatsCards(boxcat)
			creatingFillingPopup(boxcat)
			
		})
		
		 return resp
}
f1()
transferDataForms(Math.floor(Math.random() * 100))
//transferDataForms(num)
// передать данные из формы / transmit data from the form
function transferDataForms(num) {
	document.querySelector(".popup2__form").addEventListener("submit", (e) => {
		e.preventDefault();
		let form = document.querySelector(".popup2__form");
		if (
			form.elements.name.value.trim() !== "" &&
			form.elements.age.value.trim() !== ""
		) {
			localStorage.clear();
			document.querySelector(".cats__container").innerHTML = "";
			obj.name = form.elements.name.value;
			obj.age = form.elements.age.value;
			obj.description = form.elements.description.value;
			obj.id = num + 1;
			form.reset();
			async function myfunc(){
				await addCatFetch()
				await f1()
			}
			myfunc()
			// async function f2() {
			// 	 let a = await addCatFetch();
			// 	let b = await f1();
			// }
			// f2()
			//f1()
			console.log(obj);
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
}



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




// Открыть - закрыть pопап2 / Open - Close popup2
 function addCat (){
	document.querySelector('.header__btn').addEventListener('click', () =>{
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
			
			cats.forEach(item => {
				//console.log(el.currentTarget.getAttribute("data-name"));
				if (el.currentTarget.getAttribute("data-name") * 1 === item.id) {
					console.log(el.currentTarget.getAttribute("data-name"));
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
				}
			})
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
	}
}))
}





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