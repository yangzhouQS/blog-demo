const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS'
const t = base64.match(/:(.*?);/)[1]
console.log(t)


