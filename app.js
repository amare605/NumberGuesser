/*
說明:
1. 玩家必須數入一個數字，這個數字必須介於最小值跟最大值
2. 玩家有一個固定的次數可以猜
3. 程式需告知，玩家還剩餘幾次機會可以猜
4. 如果玩家輸了，程式續告知正確答案是多少
5. 讓玩家有可以重新玩的機會
*/


// 遊戲數值設定
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    
    
// UI 元件

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// 設定 UI min and max
minNum.textContent = min ;
maxNum.textContent = max ;

// 再玩一次的eventlistner
game.addEventListener('mousedown', function(e){
    if(e.target.className ==='play-again'){
        window.location.reload();
    }
})


// Guess的eventlistner
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

// 檢驗是否輸入介於Min 和 max 和有填寫
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`請輸入一個介於 ${min} 和 ${max} 的數字` ,'red');
} 

// 檢查為正確答案
if(guess === winningNum) {

    gameOver(true,`${winningNum} 是正確答案` );
    
} else{
    // 輸入錯誤答案
    guessesLeft -= 1;

    if(guessesLeft === 0){

        gameOver(false, `遊戲結束，正確數字為${winningNum}`);
        
    } else {
        // 輸入錯誤，接續遊戲
        
        // 輸入框亮紅燈
        guessInput.style.borderColor = 'red';

        // 清出輸入欄位，讓玩家可以重新輸入
        guessInput.value ='';

        // 告訴玩家輸入的是錯誤答案， 還剩幾次機會
        setMessage(`${guess} 為錯誤答案，剩餘次數:${guessesLeft} 次`,'red');
    }


}


});


// 遊戲結束
function gameOver(won, msg){
    let color;
    won === true ? color = 'green'  : color ='red'
    
    // 禁止再輸入
    guessInput.disabled = true ;
    // 輸入框亮綠燈
    guessInput.style.borderColor = color;
    // 顯示訊息
    setMessage(msg , color);

    // 再玩一次
    guessBtn.value = '再玩一次';
    guessBtn.className += 'play-again';

}


// 設定訊息
function setMessage(msg , color){
    message.textContent = msg;
    message.style.color = color;
    
}

// 亂數自動產生
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  
}