const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '19406187-1c8edae385fab91e951e657a3';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log(this);
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19406187-1c8edae385fab91e951e657a3`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
