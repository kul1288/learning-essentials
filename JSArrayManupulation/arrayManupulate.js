/* get only desired object key value from Object array*/

let expertData = [{ "password": 12112, "uuid": "dfdf", "categories": [1, 2, 3, 4], "name": "aaaa" }, { "password": 121123, "uuid": "sdfdf", "categories": [1, 2, 3, 4, 5], "name": "akkwewe" }];
expertData = expertData.map(({ password, uuid, ...rest }) => ({ ...rest }));
console.log('expertData', expertData);
//[{categories: [1, 2, 3, 4],name: "aaaa"}, {  categories: [1, 2, 3, 4, 5],name: "akkwewe"}]


/* create new structure from object array*/
let expertData1 = [{ "password": 12112, "uuid": "dfdf", "categories": [1, 2, 3, 4], "name": "aaaa" }, { "password": 121123, "uuid": "sdfdf", "categories": [1, 2, 3, 4, 5], "name": "akkwewe" }];
expertData1 = expertData1.map((elem) => (
    {
        uuidpass: {
            uuid: elem.uuid,
            password: elem.password
        },
        catname: {
            categories: elem.categories,
            name: elem.name
        }
    }
));
console.log('expertData', expertData);
//[{catname:  { categories: [1, 2, 3, 4], name: "aaaa"},uuidpass: { password: 12112, uuid: "dfdf" }},  {  catname:  {categories: [1, 2, 3, 4, 5],name: "akkwewe"},uuidpass: {password: 121123,uuid: "sdfdf"}}]

// sort array with reduce 
let arr = [1, 4, 6, 2, 3, 8, 5]
let sortArr = arr.reduce((acc, cur) => {
    return [...acc.filter((ele) => { return ele < cur }), cur, ...acc.filter((ele) => { return ele > cur })]
}, [])
console.log(sortArr)