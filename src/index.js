import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';



const breedSelect = document.querySelector('.breed-select')
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');


breedSelect.setAttribute('id', 'single')
breedSelect.addEventListener('change', onSelectCat);
loaderMessage.classList.add('is-hidden');
errorMessage.classList.add('is-hidden');

Notiflix.Notify.init({
    position: 'center-top',
    distance: '45px',
    timeout: 2500,
    cssAnimationStyle: 'zoom',
    fontFamily: 'Arial, sans-serif',
});


    fetchBreeds()
        .then(breeds => markupSelectBreeds(breeds))
        .catch(() => {
        loaderMessage.classList.add('is-hidden');
        Notiflix.Notify.failure(errorMessage.textContent);
        });

function markupSelectBreeds(beeds){
    breedSelect.classList.remove('is-hidden');
    loaderMessage.classList.add('is-hidden');
    const markup = beeds.map((breed, idx) => {
        return `<option value="${breed.id}">${breed.name}</option>`
    }).join('');
    breedSelect.innerHTML = markup;
    new SlimSelect({
        select: '#single'
      })
};

function markupCatInfo(arrCat){
    if(arrCat.length === 0){
        catInfo.classList.add('is-hidden')
        return Notiflix.Notify.warning(errorMessage.textContent)
    }
    const catInfoShow = arrCat.map(({url, breeds}) => {
        const {name, description, temperament} = breeds[0]
        return `
        <img src="${url}" alt="${name}" />
      <div class="desc-wrapper">
        <h2>${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
      </div>`
    }).join('');
    catInfo.innerHTML = catInfoShow;


}

function onSelectCat(e){
    const idCat = e.currentTarget.value;
    loaderMessage.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');

    fetchCatByBreed(idCat)
        .then(data => {
        catInfo.classList.remove('is-hidden');
        setTimeout(() => {
            loaderMessage.classList.add('is-hidden')
            markupCatInfo(data)
        },0)       
    })
    .catch(() => {
        loaderMessage.classList.add('is-hidden')
        Notiflix.Notify.failure(errorMessage.textContent)
    })

};




    




