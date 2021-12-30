let items = [];
var addItem = (item, renderFn) => {
    var createFn = renderFn || createHTML;
    items.push(item);
    createHTML(item);
    form.reset();
};

var showError = (error) => {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    const containerError = document.querySelector('.error-message');
    containerError.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

var createHTML = (item) => {
    if (items.length > 0) {
        var row = '';
        var li = document.createElement('li');
        var keys = Object.keys(item);
        for ( var i = 0; i < keys.length; i++){
            row += `${item[keys[i]]} `;
        }
        li.innerText = row;
        list.appendChild(li);
    }
}