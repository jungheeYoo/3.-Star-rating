// do something!

const CONTAINER_CLASS_NAME = 'star-rating-container';
const cssStyle = './star-rating/theme.css';

// <link href="star-rating/theme.css" rel="stylesheet" />
const loadStyle = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement('link');
  link.href = href;
  link.rel = 'stylesheet';

  const lastLink = document.querySelector('link:last-of-type');

  document.head.insertBefore(link, lastLink.nextElementSibling);
};

const makeStarRating = (maxRating) => {
  const StarRatingCon = document.createElement('div');
  StarRatingCon.className = CONTAINER_CLASS_NAME;

  for (let i = 0; i < maxRating; i++) {
    const star = document.createElement('i');
    star.dataset.id = i + 1;
    star.className = 'bx bxs-star';
    StarRatingCon.appendChild(star);
  }
  return StarRatingCon;
};

const StarRating = ($container) => {
  loadStyle(cssStyle);

  const maxRating = $container.dataset.maxRating;

  const StarRatingCon = makeStarRating(maxRating);
  $container.appendChild(StarRatingCon);
};

export default StarRating;
