let array1=[{id:'1', data: 'abcd'},{id:'2', data: 'abcde'},{id:'3', data: 'abcdf'}];
let del={ 
};
for (const element of array1) {
    del[element.id]=element.data;
    console.log(element);
    console.log(del);
}