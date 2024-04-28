let getMoreUrl = 'https://api.nasa.gov/planetary/apod?api_key=Zy4fni8MEI1DTrthHAdGDDPgUAJ5Ed1zMzMzy9ba&count=5';
let startIndex = 0;
const photosPerLoad = 5;

function loadInfo() {
    fetch(getMoreUrl)
        .then(response => response.json())
        .then(data => {
            const wrapper = document.querySelector('#wrapper');
            getMoreUrl = data.next;
            data.forEach(photo => {
                const container = document.createElement('div');
                container.classList.add('photo-info-container');

                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = 'NASA Photo';

                const description = document.createElement('p');
                description.textContent = photo.explanation;

                const date = document.createElement('p');
                date.textContent = `Date: ${photo.date}`;

                container.appendChild(img);
                container.appendChild(description);
                container.appendChild(date);
                wrapper.appendChild(container);
            });
            startIndex += photosPerLoad;
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}

function loadMore() {
    fetch(getMoreUrl)
        .then(response => response.json())
        .then(data => {
            const wrapper = document.querySelector('#wrapper');
            // Обновляем getMoreUrl для следующей загрузки
            getMoreUrl = data.next;
            data.forEach(photo => {
                const container = document.createElement('div');
                container.classList.add('photo-info-container');

                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = 'NASA Photo';

                const description = document.createElement('p');
                description.textContent = photo.explanation;

                const date = document.createElement('p');
                date.textContent = `Date: ${photo.date}`;

                container.appendChild(img);
                container.appendChild(description);
                container.appendChild(date);
                wrapper.appendChild(container);
            });
            startIndex += photosPerLoad;
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}

document.getElementById('loadMoreBtn').addEventListener('click', loadMore);


loadInfo();