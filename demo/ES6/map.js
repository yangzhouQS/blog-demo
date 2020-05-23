let arr = ['apple','pen','app-pen']

/*for (let i = 0; i < arr.length; i++) {
  const arrElement = arr[i]
  arr[i] = arrElement[0].toLocaleUpperCase()+arrElement.substr(1)
}*/

for(const i in arr){
  const c = arr[i][0];
  arr[i] = c.toUpperCase() + arr[i].slice(1);
}

console.log(arr);
