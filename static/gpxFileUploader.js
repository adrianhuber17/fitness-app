const uploadForm = document.querySelector('.upload')
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault()

    let file = e.target.uploadFile.files[0]
    let comment = document.querySelector("input#ridecap").value;

    let formData = new FormData()
    formData.append('file', file)
    formData.append('ride-caption',comment)

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
            alert('.gpx file uploaded successfully')
        }
    })
})