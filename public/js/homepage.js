const newsContainer = document.querySelector('.custom-external-news');

const displayNews = (arr) => {
    for (let i = 0; i < arr.length; i++) {
       const newsAnchorEl = document.createElement('a');
       const newsImgEl = document.createElement('img');
       const newsHeadlineEl = document.createElement('h4');
       const newsDateEl = document.createElement('p');
       newsContainer.appendChild(newsAnchorEl);
       newsAnchorEl.append(newsImgEl, newsHeadlineEl, newsDateEl);

       
       newsAnchorEl.setAttribute('href', `${arr[i].url}`);
       newsAnchorEl.setAttribute('target', '_blank')
       newsImgEl.setAttribute('src', `${arr[i].image_url}`);

       newsHeadlineEl.textContent = arr[i].title;
       newsDateEl.textContent = arr[i].published_at;
       console.log((arr[i].published_at))

    }
}
const externalNews = async () => {
    var newsUrl = 'https://api.thenewsapi.com/v1/news/top?api_token=Kteg70IVO4qGxPsQIfP4R34p8xs2mUW5xCWcsKnb&locale=au&limit=3';
    try {
      const response = await fetch(newsUrl);
      const data = await response.json();
      console.log(data.data);
      displayNews(data.data);
    } catch (err) {
      console.error(err)
    }
  }

externalNews();