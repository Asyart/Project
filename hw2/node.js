let database = [
["الكمية", "السعر", "اسم المؤلف", "اسم الكتاب",	"ID"]
[13,	80.0,	"Simon Sinek",	"Start with why",	1],
[22,	59.9,	"J. Clark Scott",	"But how do it know",	2],
[5,	    50.0,	"Robert Cecil Martin",	"Clean Code",	3],
[12,	45.0,	"Peter Thiel",	"Zero to One",	4],
[9,	    39.9,	"Kyle Simpson",	"You don't know JS",    5]
]

function byBookID_title_author(id){
    for(let i = 0; i<database.length; i++){
       for(let j = 0; j<database[i].length;j++){
        if(database[i][j] == id){
            return database[i];
        }
       }
    }
}

console.log(byBookID(2));
 