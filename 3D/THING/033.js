function arr(nums){
    const len = nums.length;
    let arr = [];
    let num1=0;
    let num2=0;
    for(let i=1;i<=len;i++){
        if(nums.indexOf(i)<0){
            num1=i
        }
    }
    for(let ele of nums){
        if(arr.indexOf(ele)>=0){
            num2=ele
        }else{
            arr.push(ele)
        }
    }
    return [num1,num2]
};

let nums = [1, 2, 2, 4]
nums = [1, 1]
console.log(arr(nums))
