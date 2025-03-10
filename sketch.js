let question;
let radio;
let input;
let submitButton;
let result;
let questions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let defaultBackgroundColor = "#e0b1cb";
let nameTag;
let scoreTag;

function preload() {
  // 載入 Excel 檔案
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(defaultBackgroundColor);

  textSize(30);

  question = createP('');
  question.style('font-size', '30px');
  question.position(width / 2 - question.elt.offsetWidth / 5, height / 2 - 105);

  radio = createRadio();
  radio.style('font-size', '30px');
  radio.position(width / 2 - radio.elt.offsetWidth / 5, height / 2 - 45);

  input = createInput();
  input.style('font-size', '30px');
  input.position(width / 2 - input.elt.offsetWidth / 2, height / 2 - 45);
  input.hide();

  submitButton = createButton('提交');
  submitButton.style('font-size', '30px');
  submitButton.position(width / 2 - submitButton.elt.offsetWidth / 2, height / 2);
  submitButton.mousePressed(submitAnswer);

  result = createP('');
  result.style('font-size', '30px');
  result.position(width / 2 - result.elt.offsetWidth / 2, height / 2 + 50);

  // 在右上角顯示 "413730366 張芷瑄"
  nameTag = createP('413730366 張芷瑄');
  nameTag.style('font-size', '20px');
  nameTag.position(width - nameTag.elt.offsetWidth - 20, 20);

  // 在右上角顯示答對題數與答錯次數
  scoreTag = createP(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  scoreTag.style('font-size', '20px');
  scoreTag.position(width - scoreTag.elt.offsetWidth - 20, 50);

  loadQuestion();
}

function draw() {
  background(defaultBackgroundColor);
}

function loadQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    let currentQuestion = questions.getRow(currentQuestionIndex);
    question.html(currentQuestion.get('question'));
    radio.elt.innerHTML = ''; // 清空選項
    input.hide();
    if (currentQuestion.get('option1') && currentQuestion.get('option2')) {
      radio.option(currentQuestion.get('option1'));
      radio.option(currentQuestion.get('option2'));
      if (currentQuestion.get('option3')) radio.option(currentQuestion.get('option3'));
      if (currentQuestion.get('option4')) radio.option(currentQuestion.get('option4'));
      radio.show();
    } else {
      radio.hide();
      input.show();
    }
    defaultBackgroundColor = "#e0b1cb"; // 回復預設背景顏色
  } else {
    question.html('測驗結束');
    radio.hide();
    input.hide();
    submitButton.hide();
    result.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
    defaultBackgroundColor = "#e0b1cb"; // 顯示最後結果時背景色恢復成#e0b1cb
  }
  // 更新答對題數與答錯題數
  scoreTag.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
}

function submitAnswer() {
  let answer;
  if (radio.elt.style.display !== 'none') {
    answer = radio.value();
  } else {
    answer = input.value();
  }
  let correctAnswer = questions.getString(currentQuestionIndex, 'answer');
  if (answer === correctAnswer) {
    correctCount++;
    result.html('答對了');
    defaultBackgroundColor = "#84a98c"; // 答對時背景顏色
  } else {
    incorrectCount++;
    result.html('回答錯誤');
    defaultBackgroundColor = "#ff4d6d"; // 答錯時背景顏色
  }
  currentQuestionIndex++;
  setTimeout(loadQuestion, 1000); // 延遲1秒後載入下一題
}
