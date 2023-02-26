const gameArea = document.querySelector('.gameArea');
const btn = document.createElement('button');
const output = document.createElement('div');
const inWord = document.createElement('input');
const scoreBoard = document.createElement('div');
const selWordList = document.createElement('select');




scoreBoard.style.color= 'white';
scoreBoard.style.backgroundColor = 'black';
scoreBoard.style.padding = '25px';
inWord.setAttribute('type','text');
inWord.classList.add('myInput');
output.style.textAlign = 'center';
btn.textContent = "START GAME!";
// output.textContent = "Words Loading...... ";
output.style.letterSpacing = '0';
/// Add to HTML page

gameArea.append(output);
gameArea.append(inWord);
gameArea.prepend(scoreBoard);
gameArea.append(selWordList);
gameArea.append(btn);



//hide non needed
// scoreBoard.style.display = 'none';
// inWord.style.display = 'none';
// btn.style.display = 'none';
// selWordList.style.display = 'none';
//console.log(btn );

const myArr = [];
let myWords = [];
// const myWords = ["hi","bird","dog","cat","cow"]; //min 2 character words or we end up in a loop
// const myWords = ["hi","bird"];

const game = {sel:'',scramble:'',score:0,incorrect:0,wordsLeft:0,played:myWords.length,inplay:false};
const id = '1t2W2JkmhHdxrcydGi7qOwH9szdciKjEEpfyIHlNal1o';
let url = 'https://docs.google.com/spreadsheets/d/' + id + '/edit#gid=0';
// https://docs.google.com/spreadsheets/d/1t2W2JkmhHdxrcydGi7qOwH9szdciKjEEpfyIHlNal1o/edit#gid=0

fetch(url)
        // .then(res => res.text())
        .then(rep =>{
            console.log(rep);
        })

//event listener
btn.addEventListener('click',(e)=>{
    console.log(myWords);
    // if(!game.inplay){
    //     selWordList.style.display = 'none';
    //     //console.log(myArr[selWordList.value]);
    //     myWords = myArr[selWordList.value].join('').split(' ');
    //     game.played = myWords.length;
    //     game.inplay = true;
    // }
    if(myWords.length <= 0){
        console.log('game over');
        game.inplay = false;
        scoreBoard.style.display = 'none';
        output.style.fontSize = '1.2em';
        output.style.letterSpacing = '0';
        output.innerHTML = `<div>GAME OVER</div>`;
        output.innerHTML += `<div>You Got ${game.score} correct vs ${game.incorrect} incorrect out of ${game.played} words total</div>`
        btn.style.display = 'block';
        output.innerHTML +="Please Select your word List";
        selWordList.style.display = 'block';
        btn.textContent = 'Start New Game';
        game.score = 0;
        game.incorrect = 0;
    }else{

        inWord.disabled = false;
        inWord.value = "";
        inWord.style.borderWidth = '1px';
        inWord.style.borderColor = '#eee';
        scoreBoard.style.display = 'block';
        inWord.style.display = 'inline';
        btn.style.display = 'none';
        myWords.sort(()=>{ return 0.5 - Math.random()});
        game.sel = myWords.shift();
        game.wordsLeft = myWords.length;
        game.scramble = sorter(game.sel);
        addScore();   
        output.style.fontSize = '3em';
        output.style.letterSpacing = '0.5em';
        inWord.setAttribute('maxlength',game.sel.length);
        inWord.focus();
        output.textContent = `${game.scramble}`;
    }
})

inWord.addEventListener('keyup',(e)=>{
    inWord.style.borderColor = '#eee';
    inWord.style.borderWidth = '1px';
    if(inWord.value.length == game.sel.length || e.code == 'Enter'){
        winChecker();
    }
})

function addScore(){
    let tempOutput = `Score : <b>${game.score}</b> vs incorrect <i>(${game.incorrect})</i> <small>${game.wordsLeft} words left</small>`;
    scoreBoard.innerHTML = tempOutput;
}

function winChecker(){
    inWord.style.borderWidth = '5px';
    if(inWord.value == game.sel){
        inWord.style.borderColor = 'green';
        game.score++;
        inWord.disabled = true;
        btn.style.display = 'block';
        btn.textContent = 'Click for Next Word';
    }else{
        inWord.style.borderColor = 'red';
        inWord.value = '';
        inWord.focus();
        game.incorrect++;
    }
    addScore();
}

function sorter(val){
    let temp = val.split('');
    temp.sort(()=>{ return 0.5 - Math.random()});
    temp = temp.join('');
    //console.log(temp);
    if(val === temp){
        //console.log(val,temp);
        return sorter(val);
    }
    return temp;
}
// const gameArea = document.querySelector('.gameArea');
// const btn = document.createElement('button');
// const output = document.createElement('div');
// const inWord = document.createElement('input');
// const scoreBoard = document.createElement('div');
// scoreBoard.style.color= 'white';
// scoreBoard.style.backgroundColor = 'black';
// scoreBoard.style.padding = '25px';
// inWord.setAttribute('type','text');
// inWord.classList.add('myInput');
// output.style.textAlign = 'center';
// btn.textContent = "START GAME!";
// output.textContent = "Click that button ";
// output.style.letterSpacing = '0';
// /// Add to HTML page

// gameArea.append(output);
// gameArea.append(inWord);
// gameArea.prepend(scoreBoard);
// gameArea.append(btn);

// //hide non needed
// scoreBoard.style.display = 'none';
// inWord.style.display = 'none';


// console.log(btn );
// ///game start values
// //const myWords = ["hi","bird","dog","cat","cow"]; //min 2 character words or we end up in a loop
// const myWords = ["hi","bird"];
// const game = {sel:'',scramble:'',score:0,incorrect:0,wordsLeft:0,played:myWords.length};


// //event listener
// btn.addEventListener('click',(e)=>{
//     //console.log(myWords);
//     if(myWords.length <= 0){
//         console.log('game over');
//         gameArea.innerHTML = `<div>GAME OVER</div>`;
//         gameArea.innerHTML += `<div>You Got ${game.score} correct vs ${game.incorrect} incorrect out of ${game.played} words total</div>`
//     }else{

//     inWord.disabled = false;
//     inWord.value = "";
//     inWord.style.borderWidth = '1px';
//     inWord.style.borderColor = '#eee';
//     scoreBoard.style.display = 'block';
//     inWord.style.display = 'inline';
//     btn.style.display = 'none';
//     myWords.sort(()=>{ return 0.5 - Math.random()});
//     game.sel = myWords.shift();
//     game.wordsLeft = myWords.length;
//     console.log(game);
//     game.scramble = sorter(game.sel);

//     addScore();   
//     output.style.fontSize = '3em';
//     output.style.letterSpacing = '0.5em';
//     inWord.setAttribute('maxlength',game.sel.length);
//     inWord.focus();
//     output.textContent = `${game.scramble}`;
//     console.log(game.sel,game.scramble);
//     }
// })


// inWord.addEventListener('keyup',(e)=>{
//     console.log(e);
//     inWord.style.borderColor = '#eee';
//     inWord.style.borderWidth = '1px';
//     if(inWord.value.length == game.sel.length || e.code == 'Enter'){
//         winChecker();
//     }
// })



// function addScore(){
//     let tempOutput = `Score : <b>${game.score}</b> vs incorrect <i>(${game.incorrect})</i> <small>${game.wordsLeft} words left</small>`;
//     scoreBoard.innerHTML = tempOutput;
// }



// function winChecker(){
//     inWord.style.borderWidth = '5px';
//     if(inWord.value == game.sel){
//         console.log('correct');
//         inWord.style.borderColor = 'green';
//         game.score++;
//         inWord.disabled = true;
//         btn.style.display = 'block';
//         btn.textContent = 'Click for Next Word';
//     }else{
//         inWord.style.borderColor = 'red';
//         console.log('incorrect');
//         inWord.value = '';
//         inWord.focus();
//         game.incorrect++;
//     }
//     addScore();
// }



// function sorter(val){
//     let temp = val.split('');
//     temp.sort(()=>{ return 0.5 - Math.random()});
//     temp = temp.join('');
//     console.log(temp);
//     if(val === temp){
//         console.log(val,temp);
//         return sorter(val);
//     }
//     return temp;
// }




