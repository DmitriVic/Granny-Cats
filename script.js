
let num = 0
cats.forEach(item => {
	document.querySelector('.cats__container').innerHTML +=
		`	<div class="cats__card card" data-name = "${item.id}">
		<div class="card__content">
			<div class="card__box-img">
				<img src="${item.img_link}" class="card__img" alt="">
			</div>
			<div class="card__name">${item.name}</div>
			<div class="card__rate"></div>
		</div>
	</div> `
	let cardRate = document.querySelectorAll('.card__rate')
	let check = 0;
	for (let i = 0; i < item.rate; i++) {
		cardRate[num].innerHTML += '<img src="https://sb-cats.herokuapp.com/img/cat-fill.svg" class="imgcats" alt="^_^">'
		check++
	}
	for (check; check < 10; check++) {
		cardRate[num].innerHTML += '<img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">'
	}
	num++
})

let card = document.querySelectorAll('.card')
let ageCat = ""


	card.forEach(e => {
		e.addEventListener('click', (el =>{
			cats.forEach(item => {
				if (el.currentTarget.getAttribute("data-name") * 1 === item.id) {
					if (item.age === 1) {
						ageCat = "Год"
					} else if (item.age === 2){
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
		e.addEventListener('mouseenter', (e =>{
			console.log(e.target);
			console.log(e.target.querySelector('.card__img')); 
			e.target.querySelector('.card__img').style.filter = "opacity(100%)"
		}))
		e.addEventListener('mouseleave', (e =>{ 
			e.target.querySelector('.card__img').style.filter = "opacity(60%)"
		}))
	})

document.querySelector('.popup').addEventListener('click',(e => {
	if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) {
		document.querySelector('.popup').classList.remove("_active")
		document.body.style.overflow = "visible"
	}
}))

// card.forEach(e => {
// 	e.addEventListener('click', (el=>{
// 		if (cats.forEach(elem=> {
// 			el.getAttribute("data-name") === elem.name
// 		})) {
// 			console.log("yra");
// 		}
// 	}))
// })



// let catsContainer = document.querySelector('.cats__container')

// catsContainer.addEventListener("click", (e =>{
// 	if (e.target.classList.contains('card__content')){
// 		console.log('Ура');
// 	}
// }))






//  function showRating() {
// 	let rate = document.querySelector('.rate')

// 	let check = 0;
// 	for (let i = 0; i < 7; i++) {
// 	  rate.innerHTML += '<img src="https://sb-cats.herokuapp.com/img/cat-fill.svg" class="imgcats" alt="^_^">'
// 		check++
// 	}
// 	for (check; check < 10; check++) {
// 	  rate.innerHTML += '<img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="^_^">'
  
//   }
//  }
//let box = document.querySelector('.box')



//  <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
// <img src="https://sb-cats.herokuapp.com/img/cat-stroke.svg" class="imgcats" alt="O_o">
