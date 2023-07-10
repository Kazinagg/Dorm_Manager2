import React from 'react';
import { Link } from 'react-router-dom';
import './NewsFeed.css';
import HollImage from '../images/Holl.jpg';
import UpMoneyImage from '../images/UpMoney.jpg';
import ProgrammingCourseImage from '../images/ProgrammingCourseImage.jpg';
import SportsComplexImage from '../images/SportsComplexImage.jpg';
import CreativeFestivalImage from '../images/CreativeFestivalImage.jpg';
import InternshipOpportunitiesImage from '../images/InternshipOpportunitiesImage.jpg';
import ScientificResearchExhibitionImage from '../images/ScientificResearchExhibitionImage.jpg';
import OnlineCoursesImage from '../images/OnlineCoursesImage.jpg';
const newsData = [
  {
    id: 1,
    title: 'Рим не сразу строился',
    description: 'Важная новость для студентов! Общежитие, в котором проживают многие студенты, наконец-то претерпит капитальный ремонт.',
    image: HollImage,
  },
  {
    id: 2,
    title: 'Чудеса случаются',
    description: 'В рамках нового образовательного проекта, правительство объявило о значительном увеличении стипендий для студентов.',
    image: UpMoneyImage,
  },
  {
    id: 3,
    title: 'Новый курс по программированию',
    description: 'Университет запускает новый курс по программированию, который позволит студентам освоить современные языки программирования и получить востребованные навыки для работы в IT-индустрии.',
    image: ProgrammingCourseImage,
  },
  {
    id: 4,
    title: 'Открытие нового спортивного комплекса',
    description: 'Университет открывает новый спортивный комплекс, оснащенный современным оборудованием. Студенты смогут заниматься спортом и поддерживать свое физическое здоровье в комфортных условиях.',
    image: SportsComplexImage,
  },
  {
    id: 5,
    title: 'Студенческий фестиваль творчества',
    description: 'В университете пройдет студенческий фестиваль творчества, где студенты смогут показать свои таланты в различных областях: музыке, танцах, живописи и многое другое.',
    image: CreativeFestivalImage,
  },
  {
    id: 6,
    title: 'Новые возможности для стажировок',
    description: 'Университет заключил партнерство с ведущими компаниями, что открывает новые возможности для студентов по прохождению стажировок и получению практического опыта в своей области.',
    image: InternshipOpportunitiesImage,
  },
  {
    id: 7,
    title: 'Выставка научных исследований',
    description: 'В университете пройдет выставка научных исследований, где студенты смогут представить свои проекты и открытия в различных научных областях.',
    image: ScientificResearchExhibitionImage,
  },
  {
    id: 8,
    title: 'Запуск онлайн-курсов для самообразования',
    description: 'Университет запускает серию онлайн-курсов, которые позволят студентам самостоятельно изучать различные предметы и развивать свои навыки.',
    image: OnlineCoursesImage,
  },
  // Добавьте другие новости в массив newsData
];


const HomePage: React.FC = () => {
    return (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height у //',vh100 ':становите высоту по вашему усмотрению
    }}>
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
    <div>

    </div>
    </div>
    
    );
    
};

export default HomePage;