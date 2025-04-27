const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.card');

function updateActiveCard() {
  const center = window.innerWidth / 2;
  let closestCard = null;
  let minDistance = Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(cardCenter - center);

    if (distance < minDistance) {
      minDistance = distance;
      closestCard = card;
    }
  });

  cards.forEach(card => card.classList.remove('active'));
  if (closestCard) closestCard.classList.add('active');
}

function smoothScrollToCard(card) {
  const rect = card.getBoundingClientRect();
  const cardCenter = rect.left + rect.width / 2;
  const scrollOffset = cardCenter - window.innerWidth / 2;
  const start = carousel.scrollLeft;
  const target = start + scrollOffset;
  const duration = 600;
  let startTime = null;

  function scrollStep(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const ease = (t) => t * (2 - t);
    const percent = Math.min(progress / duration, 1);
    const scroll = start + (target - start) * ease(percent);
    carousel.scrollLeft = scroll;
    if (percent < 1) requestAnimationFrame(scrollStep);
  }

  requestAnimationFrame(scrollStep);
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    smoothScrollToCard(card);
  });
});

carousel.addEventListener('scroll', () => {
  requestAnimationFrame(updateActiveCard);
});

window.addEventListener('load', () => {
  smoothScrollToCard(cards[9]); // Start around Quest 10
});

const correctAnswers = {
  1: "answer1",
  2: "answer2",
  3: "answer3",
  4: "answer4",
  5: "answer5",
  6: "answer6",
  7: "answer7",
  8: "answer8",
  9: "answer9",
  10: "answer10",
  11: "answer11",
  12: "answer12",
  13: "answer13",
  14: "answer14",
  15: "answer15",
  16: "answer16",
  17: "answer17",
  18: "answer18",
  19: "answer19",
  20: "fluent"
};

function showAnswerBox(id) {
  document.getElementById('answer-box-' + id).style.display = 'block';
}

function submitAnswer(id) {
  const userAnswer = document.getElementById('answer-input-' + id).value.trim().toLowerCase();

  if (userAnswer === correctAnswers[id]) {
    alert("Correct! You can mint your NFT now!");

    // Hide the answer box and clear the input
    document.getElementById('answer-box-' + id).style.display = 'none';
    document.getElementById('answer-input-' + id).value = '';

    // Call the smart contract mint function here
    mintNFT(id); // You will later define this function
  } else {
    alert("Wrong answer. Try again.");
    // Keep box open
  }
}