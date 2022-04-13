const uploadForm = document.querySelector('.upload')
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let file = e.target.uploadFile.files[0]
    console.log(file)
    let formData = new FormData()
    formData.append('file', file)
    console.log(formData)
    fetch('/post-gpx-parser', {
        method: 'POST',
        body: formData,
        hearders: {'Content-Type': 'multipart/form-data'}
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.errors) {
            alert(data.errors)
        }
        else {
            console.log(data)
        }
    })
})