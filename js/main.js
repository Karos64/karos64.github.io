// clear form cookies
let cookies = [
    'formName', 'formStreet', 'formStreetNr', 'formZipCode',
    'formCity', 'formNip', 'formRegon', 'formKrs', 'formBank'
]

for(let i = 0; i < cookies.length; i++) {
    document.cookie = cookies[i] +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}