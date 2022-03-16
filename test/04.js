const str = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/'

const mime = str.match(/:(.*?);/)[1]
console.log(mime)
