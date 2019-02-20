// let roomList = [{id:6,name:''},{id:7,name:2},{id:8,name:3}];
// let list = [{name:'',a:"jjd"},{name:2,a:"sa"},{name:2,a:"ser"},{name:'',a:"axx"},{name:'',a:"xzsa"},{name:3,a:"mlm"}];
//     // [
//     //     {name:'',content:[{name:'',a:"jjd"},{name:'',a:"axx"},{name:'',a:"xzsa"}]},
//     //     {name:'2',content:[{name:2,a:"sa"},{name:2,a:"ser"}]},
//     //     {name:'3',content:[{name:3,a:"mlm"}]}
//     //  ]
// let newList = [];
//
// for(let i = 0;i<roomList.length;i++)
// {
//     var temObj = {};
//
//     temObj.name = roomList[i].name;
//
//     var temList = [];
//
//     for(let j = 0; j<list.length;j++)
//     {
//         if(temObj.name == list[j].name)
//         {
//             temList.push(list[j]);
//         }
//     }
//     temObj.content = temList;
//
//     newList.push(temObj);
// }
// console.log(JSON.stringify(newList));


let arr = []
for (let i = 81; i <= 95; i=i+5) {
    arr.push(i + '很亮')
}
console.log(arr)

// [ '0很暗', '1很暗', '2很暗', '3很暗', '4很暗', '5很暗' , '6较暗', '8较暗', '10较暗' , '11偏暗', '16偏暗' , '21稍暗', '26稍暗','31稍亮', '36稍亮' , '41偏亮', '46偏亮', '51偏亮', '56偏亮','60敞亮', '65敞亮', '70敞亮', '75敞亮', '80敞亮', '81很亮', '86很亮', '91很亮' ]

// let devlist = [{yid:1},{yid:2},{yid:3},{yid:4}]
// let sev = [{yid:2},{yid:4}]
// for(let i = 0 ; i< devlist.length;i++){
//     for (let a = 0 ; a<sev.length;a++){
//         if (devlist[i].yid == sev[a].yid){
//             console.log(devlist[i])
//         }
//     }
// }
// //转换时间
// function transDate(n) {
//     var date = news Date(n);
//     var Y = date.getFullYear() + '-';
//     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//     var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
//     return (Y + M + D)
// }
// //处理原数组
// for(var i=0;i<data.length;i++){
//     var timeitem = transDate(data[i].time);
//     console.log(data[i].time);
//     data[i].time = timeitem;
// }

//返回所需数据格式
// const mapLoction = function(arr) {
//     let newArr = [];
//     arr.forEach((address, i) => {
//         let index = -1;
//         let alreadyExists = newArr.some((newAddress, j) => {
//             if (address.date === newAddress.date) {
//                 index = j;
//                 return true;
//             }
//         });
//         if (!alreadyExists) {
//             newArr.push({
//                 date: address.date,
//                 location: [address]
//             });
//         } else {
//             newArr[index].location.push(address);
//         }
//     });
//     return newArr;
// };
// console.log(mapLoction(data));

// {
//     act:"add"
//     date:{}
//     action:"1,播放张学友的祝福"
//     evindp:1
//     sev:"0,ea54365028826a624031b715be997ad7_move"
//     sevc:""
//     sna:"是的"
//     svc:""
//     timearea:"00:00-23:59"
//     timedo:""
//     did:"30373331313044303741343836424338"
//     op:"scene"
//     uid:"ow2D50OFu0K6pKxJrsSVW0LmKa-4"
// }
