"use strict";const inputSearch=document.querySelector(".js_input"),button=document.querySelector(".js_button"),showsList=document.querySelector(".js_shows_list"),form=document.querySelector(".js_form"),favoriteSidebar=document.querySelector(".js_fav_list"),favoritesContainer=document.querySelector(".js_favorites_container");let tvShows=[],favoritesTvShows=[];
//!ARRAYS
function paintShows(){let e="";for(const t of tvShows)e+=`<li class="main__section--shows-list__item js_show" id="${t.show.id}">`,e+='<div class="show__container">',null==t.show.image?e+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${t.show.name}">`:e+=`<img src="${t.show.image.medium}" alt="${t.show.name}">`,e+=`<h3>${t.show.name}</h3>`,e+="</div>",showsList.innerHTML=e;listenList()}function handleSearch(){fetch("https://api.tvmaze.com/search/shows?q="+inputSearch.value).then(e=>e.json()).then(e=>{tvShows=e,paintShows()})}
//! END GET INFO FROM API
function formPreventD(e){e.preventDefault()}
//! END NO SUBMIT
function listenList(){const e=document.querySelectorAll(".js_show");for(const t of e)t.addEventListener("click",listenerfav),paintFavoriteShows()}function listenerfav(e){const t=e.currentTarget,s=parseInt(t.id),o=tvShows.find(e=>e.show.id===s),i=favoritesTvShows.findIndex(e=>e.show.id===s);-1===i?(favoritesTvShows.push(o),t.classList.add("selected")):(favoritesTvShows.splice(i,1),t.classList.remove("selected")),setLocalStorage(),0===favoritesTvShows.length?favoritesContainer.classList.add("hidden"):favoritesContainer.classList.remove("hidden"),paintFavoriteShows()}
//! END ADD TO FAVORITES
function paintFavoriteShows(){let e="";for(const t of favoritesTvShows)e+=`<li class="main__aside--container__list--item js_fav_show" id="${t.show.id}">`,e+='<div class="main__aside--container__list--item__container">',null==t.show.image?e+=`<img class="main__aside--container__list--item__image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${t.show.name}">`:e+=`<img class="main__aside--container__list--item__image" src="${t.show.image.medium}" alt="${t.show.name}">`,e+=`<h3>${t.show.name}</h3>`,e+="</div>",favoriteSidebar.innerHTML=e}
//! END PAINT FAVORITES SIDEBAR
function getLocalStorage(){const e=localStorage.getItem("shows");null===e?favoritesTvShows=[]:(favoritesTvShows=JSON.parse(e),paintFavoriteShows()),0===favoritesTvShows.length?favoritesContainer.classList.add("hidden"):favoritesContainer.classList.remove("hidden")}function setLocalStorage(){localStorage.setItem("shows",JSON.stringify(favoritesTvShows))}
//! END LOCALSTORAGE
button.addEventListener("click",handleSearch),form.addEventListener("submit",formPreventD),getLocalStorage();