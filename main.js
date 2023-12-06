(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("keydown",o)}function t(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&t(document.querySelector(".popup_opened"))}function n(e){e.target===e.currentTarget&&t(document.querySelector(".popup_opened"))}var r="https://nomoreparties.co",c="f3166ef7-de2f-4e47-9de9-c0005a5ed228";function u(e,t){return fetch(r+"/v1/wff-cohort-1/cards/likes/"+e,{method:t,headers:{authorization:c,"Content-Type":"application/json"}}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось поставить/удалить лайк"+e.status)})).catch((function(e){console.log("Error:",e)}))}var a=document.querySelector("#popup-description"),i=a.querySelector(".popup__image"),s=a.querySelector(".popup__caption"),l=document.querySelector(".popup_confirm"),d=l.querySelector("#yes-button");function f(e,t){var o;(o=t.dataset.cardId,fetch(r+"/v1/wff-cohort-1/cards/"+o,{method:"DELETE",headers:{authorization:c,"Content-Type":"application/json"}}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось удалить карточку"+e.status)})).catch((function(e){console.log("Error:",e)}))).then((function(){e.preventDefault(),t.remove()}))}function p(e,t){var o=t.target.closest(".cards__element").querySelector(".cards__counter"),n=isNaN(parseInt(o.textContent))?0:parseInt(o.textContent);t.target.classList.contains("cards__like_active")?(u(e,"DELETE"),o.textContent=n-1,t.target.classList.remove("cards__like_active")):(u(e,"PUT"),o.textContent=n+1,t.target.classList.add("cards__like_active"),console.log(e))}function m(e,t){i.src=e,i.alt=t,s.textContent=t,a.classList.add("popup_opened"),document.addEventListener("keydown",o)}function v(o,n,r,c,u,a,i){var s=document.querySelector(".card-template").content.cloneNode(!0).querySelector(".cards__element"),f=s.querySelector(".cards__image"),p=s.querySelector(".cards__title"),m=o._id;s.dataset.cardId=o._id,f.src=n,p.textContent=r,f.alt=r;var v=s.querySelector(".cards__delete"),y=s.querySelector(".cards__like");return o.owner._id!==i&&v.remove(),v.addEventListener("click",(function(){e(l),d.addEventListener("click",(function(e){e.preventDefault(),c(e,s),t(l)}))})),y.addEventListener("click",(function(e){u(m,e)})),f.addEventListener("click",(function(){a(n,r)})),s}var y,h={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".popup__save-button",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},_=function(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=o,r.classList.add(n.errorClass)},S=function(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o.inputErrorClass),n.classList.remove(o.errorClass),n.textContent=""},E=function(e){e.disabled=!0},q=function(e,t,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e){e.disabled=!1}(t):E(t)},k=function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);o.forEach((function(o){S(e,o,t)})),E(n)},C=document.querySelector("#popup-card"),L=document.querySelector("#popup-profile"),b=document.querySelector("#popup-description"),g=document.querySelector("#popup-avatar"),w=Array.from(document.querySelectorAll(".popup")),x=document.querySelector(".popup__save-button"),j=document.querySelector(".profile__correct-button"),T=document.querySelector("#close-button-profile"),A=document.querySelector("#popup-form-edit"),z=A.querySelector("#name-input"),D=A.querySelector("#description-input"),I=document.querySelector(".profile__name"),N=document.querySelector(".profile__description"),P=document.querySelector(".profile__avatar"),O=document.querySelector(".profile__update-button"),B=document.querySelector("#close-button-avatar"),J=document.querySelector("#popup-form-avatar"),H=document.querySelector(".profile__add-button"),M=document.querySelector("#close-button-card"),U=document.querySelector("#popup-form-add"),Z=document.querySelector(".cards"),$=document.querySelector("#close-button-image");y=h,Array.from(document.querySelectorAll(y.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);q(o,n),o.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,o){t.validity.valid?S(e,t,o):_(e,t,t.validationMessage,o),/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(t.value)||"url"===!t.type&&_(e,t,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",o)}(e,r,t),q(o,n)}))}))}(e,y)})),j.addEventListener("click",(function(){e(L),k(A,h),z.value=I.textContent,D.value=N.textContent})),T.addEventListener("click",(function(){t(L)})),H.addEventListener("click",(function(){x.textContent="Создать",e(C)})),M.addEventListener("click",(function(){t(C)})),$.addEventListener("click",(function(){t(b)})),w.forEach((function(e){e.addEventListener("mousedown",n)})),O.addEventListener("click",(function(){e(g)})),B.addEventListener("click",(function(){t(g)})),J.addEventListener("submit",(function(e){e.preventDefault(),x.textContent="Сохранить";var o,n=J.querySelector("#link-input").value;P.style.backgroundImage=n,x.textContent="Сохранение...",(o=n,fetch(r+"/v1/wff-cohort-1/users/me/avatar",{method:"PATCH",headers:{authorization:c,"Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось загрузить фотографию"+e.status)})).catch((function(e){console.log("Error:",e)}))).then((function(e){P.style.backgroundImage="url('".concat(e.avatar,"')")})),J.reset(),k(J,h),t(g)})),A.addEventListener("submit",(function(e){e.preventDefault(),x.textContent="Сохранить";var o=z.value,n=D.value;x.textContent="Сохранение...",function(e,t){fetch(r+"/v1/wff-cohort-1/users/me",{method:"PATCH",headers:{authorization:c,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось сохранить новые данные пользователя"+e.status)})).catch((function(e){console.log("Error:",e)}))}(o,n),I.textContent=o,N.textContent=n,A.reset(),t(L)})),U.addEventListener("submit",(function(e){e.preventDefault(),x.textContent="Создать";var o,n,u=document.querySelector("#link-input"),a=document.querySelector("#title-input");x.textContent="Сохранение...",o=a.value,n=u.value,fetch(r+"/v1/wff-cohort-1/cards",{method:"POST",headers:{authorization:c,"Content-Type":"application/json"},body:JSON.stringify({name:o,link:n})}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось создать карточку"+e.status)})).then((function(e){var t=v(e,e.link,e.name,f,p,m,e.owner._id);document.querySelector(".cards").prepend(t)})).catch((function(e){console.log("Error:",e)})),U.reset(),k(U,h),t(C)})),Promise.all([fetch(r+"/v1/wff-cohort-1/users/me",{headers:{authorization:c}}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось загрузить информацию о пользователе"+e.status)})).then((function(e){return{name:e.name,about:e.about,avatar:e.avatar,_id:e._id}})).catch((function(e){console.log("Error:",e)})),fetch(r+"/v1/wff-cohort-1/cards",{headers:{authorization:c}}).then((function(e){if(e.ok)return e.json();throw new Error("Не удалось загрузить карточки"+e.status)})).catch((function(e){console.log("Error:",e)}))]).then((function(e){var t,o=e[0];e[1].forEach((function(e){var t=v(e,e.link,e.name,f,p,m,e.owner._id);t.querySelector(".cards__counter").textContent=e.likes.length,Z.appendChild(t)})),t=o,I.textContent=t.name,N.textContent=t.about,P.style.backgroundImage="url(".concat(t.avatar,")")})).catch((function(e){console.log("Error:",e)}))})();