let drawList = [];

let myNums = [21, 17, 45, 49, 21].sort((a, b) => a - b).join(", ");
let myStars = [7, 9].sort((a, b) => a - b).join(", ");

//console.log(myNums);
//console.log(myStars);

function drawXtimes() {
    let won = false;
    let count = 1;
    while (count < 500) {
        let numbers = [];
        let stars = [];

        while (numbers.length < 5) {
            let number = Math.floor(Math.random() * 50) + 1;
            if (!numbers.includes(number)) {
                numbers.push(number);
            }
        }

        while (stars.length < 2) {
            let star = Math.floor(Math.random() * 12) + 1;
            stars.push(star);
        }

        numbers.sort((a, b) => a - b);
        stars.sort((a, b) => a - b);

        /*let draw = {
            draw: drawList.length + 1,
            numbers: numbers.join(", "),
            stars: stars.join(", "),
        };*/

        //drawList.push(draw);

        //drawList.forEach((e) => {
        if (myNums === numbers || myStars == stars) {
            console.log(numbers, stars);
            won = true;
        }
        //});
        console.log(count++, numbers, stars);
    }
}

drawXtimes(5);
