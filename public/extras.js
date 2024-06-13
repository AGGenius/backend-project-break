const delButton = document.getElementById('delButton');

delButton.addEventListener('click', checkConfirmation);

function checkConfirmation() {
    const check = confirm("Estas seguro de que quieres borrar esto?");
    const deleteLink = `/dashboard/${delButton.value}/delete`;
    
    if(check) {
        fetch(deleteLink,  {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response);
            window.location.href = '/dashboard';
        })
        .catch (Error => {
            console.error(Error);
        })
    }
}