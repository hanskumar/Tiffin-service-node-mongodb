export function placeOrder(formObject) {
    axios.post('/place-order', formObject).then((res) => {

        console.log(res);
        //return false;

        toastr.success(res.message, "Success!", {timeOut: 5e3,showMethod:"slideDown",hideMethod:"slideUp"});
        setTimeout(() => {
            window.location.href = '/thanks';
        }, 1000);
    }).catch((err)=> {
        console.log(err);
    })
}