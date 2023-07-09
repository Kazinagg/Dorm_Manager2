import react from 'react';
import './NewsFeed.css';

const newsData = [
  {
    id: 1,
    title: 'Заголовок новости 1',
    description: 'Описание новости 1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/%D0%9A%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0_%D0%BE%D0%B1%D1%89%D0%B5%D0%B6%D0%B8%D1%82%D0%B8%D1%8F_%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82%D0%B0_%D0%A3%D0%93%D0%9C%D0%9A.jpg',
  },
  {
    id: 2,
    title: 'Заголовок новости 2',
    description: 'Описание новости 2',
    image: 'https://www.pnp.ru/upload/entities/2023/03/14/19/article/detailPicture/4b/4b/bc/50/94776e21a7c54f8498f62f1f4034b3d6.jpg',
  },
  // Добавьте другие новости в массив newsData
];

const NewsFeed: React.FC = () => {
  return (
    <div className="news-feed">
      <h1>Новости</h1>
      {newsData.map((news) => (
        <div key={news.id} className="news-item">
          <img src={news.image} alt={news.title} />
          <div className="news-content">
            <h2>{news.title}</h2>
            <p>{news.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;