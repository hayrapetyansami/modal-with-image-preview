const modal = document.querySelector('[data-modal]');
const closeModal = document.querySelector('[data-close]');
const openModal = document.querySelector('[data-open-modal]');
const addImageBtn = document.querySelector('[data-add-image]');
const fakeFile = document.querySelector('#file');


openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

const accept = ['.png', '.jpg', '.jpeg', '.gif'];
fakeFile.setAttribute('accept', accept.join(','));

const wrap = document.createElement('div');
wrap.classList.add('wrap_for_upload');

const del = document.createElement('div');
del.classList.add('preview-remove')
del.innerHTML = '&times;';
del.style.display = 'none';

let prev;

const triggerInput = () => fakeFile.click();

const upload = (event) => {
    file = Array.from(event.target.files);
    
    prev = document.createElement('div');
    addImageBtn.insertAdjacentElement('afterend', wrap);
    wrap.insertAdjacentElement('afterbegin', del);
    wrap.insertAdjacentElement('beforeend', prev);

    prev.classList.add('preview-image');
    del.style.display = 'block';

    file.forEach(file => {
        if (!file.type.match('image')) {
            return
        }

        const reader = new FileReader();

        reader.onload = ev => {
            const src = ev.target.result;
            prev.insertAdjacentHTML('afterbegin', `
                <img src="${src}" alt="${file.name}">
                <div class="preview-info">
                    <span>${file.name}</span>
                    <span>${file.size / 100}</span>
                </div>
            `);
        }

        reader.readAsDataURL(file);
    });
}

addImageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerInput();
    e.target.setAttribute('disabled', '');
});

fakeFile.addEventListener('change', upload);

del.addEventListener('click', (e) => {
    prev.classList.add('remove');
    e.target.remove();
    addImageBtn.removeAttribute('disabled', '')

    setTimeout(() => prev.remove(), 400);
});