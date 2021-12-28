/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
            movies: [
                "Логан",
                "Лига справедливости",
                "Ла-ла лэнд",
                "Одержимость",
                "Скотт Пилигрим против..."
            ]
        },
        imgAdv = document.querySelectorAll('.promo__adv img'),
        promoGenre = document.querySelector('.promo__genre'),
        promoBg = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        addCheckbox = addForm.querySelector('[type=checkbox]'),
        addFilmBtn = document.querySelector('.add button');

    // console.log(addCheckbox);

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let input = addInput.value;

        if (input) {
            if (input.length > 14) {
                input = `${input.substring(0, 15)}...`;
            }

            if (addCheckbox.checked) {
                console.log('Adding a favorite film');
            }

            movieDB.movies.push(input);
            restartFilmList(movieDB.movies, movieList);
            event.target.reset();
        }
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        promoGenre.textContent = 'драма';
        promoBg.style.backgroundImage = 'url(img/bg.jpg)';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function restartFilmList(films, block) {
        sortArr(films);
        block.innerHTML = "";
        films.forEach((film, i) => {
            block.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
    `;
        });

        document.querySelectorAll('.delete').forEach((basket, i) => {
            basket.addEventListener('click', () => {
                basket.parentElement.remove();
                films.splice(i, 1);
                restartFilmList(films, block);
            });
        });
    }
    
    deleteAdv(imgAdv);
    makeChanges();
    restartFilmList(movieDB.movies, movieList);
});