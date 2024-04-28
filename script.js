const photosPerPage = 5;
const apiKey = 'Zy4fni8MEI1DTrthHAdGDDPgUAJ5Ed1zMzMzy9ba';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${photosPerPage}`;
let getMoreUrl = apiUrl;

function loadInfo() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const wrapper = document.querySelector('#wrapper');
            data.forEach(photo => {
                const container = document.createElement('div');
                container.classList.add('col-md-4', 'mb-4');

                const card = document.createElement('div');
                card.classList.add('card', 'h-100');

                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = 'NASA Photo';
                img.classList.add('card-img-top', 'img-fluid');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = photo.title;

                const date = document.createElement('p');
                date.textContent = `Date: ${photo.date}`;
                date.classList.add('card-text', 'date');
                cardBody.appendChild(date);

                const readMoreBtn = document.createElement('button');
                readMoreBtn.textContent = 'Подробнее';
                readMoreBtn.classList.add('btn', 'btn-info', 'mt-2');
                readMoreBtn.style.backgroundColor = 'transparent';
                readMoreBtn.style.color = '#030303';
                readMoreBtn.style.borderColor = '#3c3c3d';
                readMoreBtn.addEventListener('click', () => {
                    if (!cardBody.querySelector('.description')) {
                        const description = document.createElement('p');
                        description.textContent = photo.explanation;
                        description.classList.add('card-text', 'description');
                        cardBody.appendChild(description);

                        const closeBtn = document.createElement('button');
                        closeBtn.textContent = 'Закрыть';
                        closeBtn.classList.add('btn', 'btn-danger', 'mt-2');
                        closeBtn.addEventListener('click', () => {
                            description.remove();
                            closeBtn.remove();
                        });
                        cardBody.appendChild(closeBtn);
                    }
                });

                cardBody.appendChild(title);
                cardBody.appendChild(readMoreBtn);

                card.appendChild(img);
                card.appendChild(cardBody);

                container.appendChild(card);
                wrapper.appendChild(container);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}

function loadMore() {
    loadInfo();
}

document.getElementById('loadMoreBtn').addEventListener('click', loadMore);

loadInfo();