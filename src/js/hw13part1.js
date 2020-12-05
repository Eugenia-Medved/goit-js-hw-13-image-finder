import articlesTpl from '../templates/gallery-card.hbs';
import NewsApiService from './apiService';
import getRefs from './get-refs';
import LoadMoreBtn from './load-more-btn';
const debounce = require('lodash.debounce');

const refs = getRefs();

refs.searchForm.addEventListener('submint', e => e.preventDefault());
refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.target.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();

  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(hits => {
    appendArticlesMarkup(hits);
    console.log(window.scrollY + window.innerHeight);
    // window.scrollTo(0, window.scrollY + window.innerHeight);
    window.scrollTo({
      top: window.scrollY + window.innerHeight - 100,
      behavior: 'smooth',
    });
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
