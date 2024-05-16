// do something!

const CONTAINER_CLASS_NAME = 'star-rating-container';
const STAR_RATING_STYLE = './star-rating/theme.css';

// <link href="star-rating/theme.css" rel="stylesheet" />
// star-rating-container CSS 동적으로 추가
const loadStyle = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement('link');
  link.href = href;
  link.rel = 'stylesheet';

  const lastLink = document.querySelector('link:last-of-type');

  document.head.insertBefore(link, lastLink.nextElementSibling);
};

// 별점 생성
const makeStarRating = ($container) => {
  const maxRating = $container.dataset.maxRating;
  const StarRatingCon = document.createElement('div');
  StarRatingCon.className = CONTAINER_CLASS_NAME;
  $container.appendChild(StarRatingCon);

  for (let i = 0; i < maxRating; i++) {
    const star = document.createElement('i');
    star.dataset.value = i + 1;
    star.className = 'bx bxs-star';
    StarRatingCon.appendChild(star);
  }
  return StarRatingCon;
};

// 마우스 이벤트
const handleStarRating = ($container) => {
  const stars = [...$container.querySelectorAll('i')];

  // 마우스 오버
  $container.addEventListener('mouseover', (event) => {
    const value = event.target.dataset.value;
    stars.forEach((star, i) => {
      star.classList.toggle('hovered', i < value);
    });
  });

  $container.addEventListener('mouseout', () => {
    stars.forEach((star, i) => {
      star.classList.remove('hovered');
    });
  });

  // 마우스 클릭
  $container.addEventListener('click', (e) => {
    const value = e.target.dataset.value || 0;
    console.log(value);

    stars.forEach((star, i) => {
      star.classList.toggle('selected', i < value);
    });

    $container.dispatchEvent(
      new CustomEvent('rating-change', { detail: value, bubbles: true })
    );
  });
};

const StarRating = ($container) => {
  loadStyle(STAR_RATING_STYLE);
  makeStarRating($container);
  handleStarRating($container);
};

export default StarRating;
