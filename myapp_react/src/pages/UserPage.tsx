import React, { useState, useEffect, FormEvent } from 'react';
import './UserPage.css';
import './AdminEditUserPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Divider, Form, Input, Select, Typography } from 'antd';

type AddResidenceFormProps = {
  onAddResidence: (residenceData: Residence) => void;
  idStudent2: number;
  idUser2: number;
};

// const [idStudent2, setIdStudent2] = useState(0);
// const [idUser2, setIdUser2] = useState(0);

const AddResidenceForm = ({ onAddResidence, idStudent2, idUser2 }: AddResidenceFormProps) => {
  // const { idStudent, idUser } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [studentId, setStudentId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  // console.log(idStudent, idUser)
  useEffect(() => {
      const fetchStudents = async () => {
          try {
              const response = await axios.get('/api/data/ollStudent/');
              setStudents(response.data);
              console.log(response.data);
          } catch (error) {
              console.error(error);
          }
      };
      fetchStudents();
  }, []);

  useEffect(() => {
      const fetchRooms = async () => {
          try {
              const response = await axios.get('/api/data/Rooms/');
              setRooms(response.data);
          } catch (error) {
              console.error(error);
          }
      };
      fetchRooms();
  }, []);

  const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      onAddResidence({
          residence_id: 0,
          student_id: Number(idStudent2),
          room_id: roomId,
          move_in_date: moveInDate,
          move_out_date: moveOutDate,
          payment: false
      });
      setStudentId(0);
      setRoomId(0);
      setMoveInDate('');
      setMoveOutDate('');
  };

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="student-id">idUser{idUser2}idStudent{idStudent2}</label>
          </div>
          <div>
              <label htmlFor="room-id">Номер комнаты:</label>
              <select
                  id="room-id"
                  value={roomId}
                  onChange={(event) =>
                      setRoomId(Number(event.target.value))
                  }
              >
                  <option value={0}>Выберите комнату</option>
                  {rooms.map((room) => (
                      <option key={room.room_id} value={room.room_id}>
                          {room.room_number}
                      </option>
                  ))}
              </select>
          </div>
          <div>
              <label htmlFor="move-in-date">Дата заселения:</label>
              <input
                  id="move-in-date"
                  type="date"
                  value={moveInDate}
                  onChange={(event) => setMoveInDate(event.target.value)}
              />
          </div>
          <div>
              <label htmlFor="move-out-date">Дата выселения:</label>
              <input
                  id="move-out-date"
                  type="date"
                  value={moveOutDate}
                  onChange={(event) => setMoveOutDate(event.target.value)}
              />
          </div>
          <button type="submit">Добавить информацию о проживании</button>
      </form>
  );
};


type User = {
  student_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  country_name: string;
  country_id: number;
  phone: string;
  username: string;
  password:string;
  email: string;
  avatar: string;
};

type Countries = {
  country_id: number;
  country_name: string;
};

type UserResidenceInfo = {
  residence_id: number;
  user_id: number;
  student_id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  room_number: number;
  move_in_date: string;
  move_out_date: string;
  total_cost: number;
  payment: boolean;
}

type Rooms = {
  room_id: number;
  floor: number;
  room_number: number;
  cost: number;
}

type Residence = {
  residence_id: number;
  student_id: number;
  room_id: number;
  move_in_date: string;
  move_out_date: string;
  payment: boolean;
  }

type Student = {
  student_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
};



interface UserPageProps {
  idUser: number;
  onLogout: () => void;
}


const UserPage: React.FC<UserPageProps> = ({ idUser, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [countries, setCountries] = useState<Countries[]>([]);
    const [userResidenceInfo, setUserResidenceInfo] = useState<UserResidenceInfo[]>([]);
    const [rooms, setRooms] = useState<Rooms[]>([]);

    useEffect(() => {
        let countriesData: Countries[] = [];
        let userData: User | null = null;

        async function fetchData1() {
            const response = await axios.get('/api/countries/');
            setCountries(response.data);
            countriesData = response.data;
        }

        async function fetchData2() {
            const response = await axios.get(`/api/users/get/${idUser}`);
            setUser(response.data);
            userData = response.data;
        }

        Promise.all([fetchData1(), fetchData2()]).then(() => {
            setUser((prevUser) => ({ ...prevUser!, ['country_id']: countriesData.find(country => country.country_name === userData?.country_name)?.country_id || 0 }));
        });

        axios.get('/api/data/UserResidenceInfo/')
            .then(response => {
                setUserResidenceInfo(response.data);
            });
        axios.get('/api/data/Rooms/')
            .then(response => {
                setRooms(response.data);
            });
    }, [idUser]);

    const handleEdit = () => { 
        setEditMode(true); 
    };

    const handleSave = () => { 
        console.log(user);
        axios.post(`/api/users/`, user, { 
            headers: { 'Content-Type': 'application/json', }, 
        }); 
        setEditMode(false); 
    };

    const handleCancel = () => { 
        setEditMode(false); 
        let userData: User | null = null;

        async function fetchData2() {
            const response = await axios.get(`/api/users/get/${idUser}`);
            setUser(response.data);
            // setIdStudent2(response.data.student_id)
            // setIdUser2(response.data.user_id)
            userData = response.data;
        }

        Promise.all([fetchData2()]).then(() => {
            setUser((prevUser) => ({ ...prevUser!, ['country_id']: countries.find(country => country.country_name === userData?.country_name)?.country_id || 0 }));
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({ ...prevUser!, [name]: value }));
    };
    
    // const handleSelectChange1 = (value:{ value: number, label: string }, name: string) => {
    //   setUser((prevUser) => ({ ...prevUser!, [name]: value.value }));
    // };
    
    const handleSelectChange1 = (country_id: number, name: string) => {
        console.log(country_id);
        setUser((prevUser) => ({ ...prevUser!, [name]: country_id }));
        const country = countries.find(country => country.country_id === country_id);
        if (country) {
            setUser((prevUser) => ({ ...prevUser!, ['country_name']: country.country_name}));
        }
    };
    
    const handleSelectChange2 = (value: string, name: string) => {
        setUser((prevUser) => ({ ...prevUser!, [name]: value }));
    };

    const handleAddSelectResidence = async (residenceData: Residence) => {
        try {
            const response = await axios.post('/api/data/addResidence/', residenceData);
            window.location.reload();
            // Обновляем состояние с новой информацией о проживании
            setUserResidenceInfo([...userResidenceInfo, response.data]);
        } catch (error: any) {
            console.error(error);
            alert('Ошибка при добавлении проживания: ' + error.response.data.message.split('\n')[0]);
        }
    };

    const handleDeleteSelectResidence = (residence_id: number) => {
        axios.post('/api/data/deleteResidence/' + residence_id)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            setUserResidenceInfo(prevResidenceInfo => prevResidenceInfo.filter(item => item.residence_id !== residence_id));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <div className="profile">
                    <><div className="user-avatar">
                            <Avatar size={128} src={user.avatar} />
                        </div></>
                    <><Typography.Title level={3}>
                                {user.first_name} {user.last_name}
                            </Typography.Title></>
                    <><Typography.Paragraph>
                                Дата рождения: {user.birth_date}<br />
                                Пол: {user.gender}<br />
                                Страна проживания: {user.country_name}<br />
                                Телефонный номер: {user.phone}<br />
                                Логин/Имя пользователя :{user.username}<br />
                                Пароль :{user.password}<br />
                                Электронная почта: {user.email}<br />
                            </Typography.Paragraph>

                            
                            </>
                    <>{!editMode && (
                                <div>
                                    <Button type="primary" onClick={handleEdit}>
                                        Редактировать
                                    </Button>
                                </div>
                            )}</>
                </div>
                <div className="residenceDiv">
                    <div className="residenceForm">
                        <AddResidenceForm onAddResidence={handleAddSelectResidence} idStudent2={user.student_id} idUser2={idUser}/>
                    </div>
                    <div>{userResidenceInfo && userResidenceInfo.filter(info => info.user_id === idUser).map(info => (
                            <div  key={info.room_number}>
                                <div className="residenceTitle">
                                    <div >
                                        <Typography.Title level={4}>Информация о проживании</Typography.Title>
                                        <Typography.Paragraph >
                                            {/* Номер student_id: {info.student_id}<br /> */}
                                            Номер комнаты: {info.room_number}<br />
                                            Дата заселения: {info.move_in_date}<br />
                                            Дата выселения: {info.move_out_date}<br />
                                            Общая стоимость: {info.total_cost}<br />
                                        </Typography.Paragraph>
                                        <div className="checkbox-wrapper-10">
                                            <input className="tgl tgl-flip" id="cb5" type="checkbox" checked={info.payment} />
                                            <label className="tgl-btn" data-tg-off="Плоти-налог" data-tg-on="Уплочно!" htmlFor="cb5"></label>
                                        </div>
                                    </div>
                                    <Button onClick={() => handleDeleteSelectResidence(info.residence_id)}>Удалить информацию о проживании</Button>
                                </div>
                            </div>
                        ))}</div>
                </div>

                <>
                {editMode && (
                        <div className='editModeDiv'>
                            <div className='editMode'>
                                <Form layout="vertical">
                                    <Form.Item label="Имя">
                                        <Input name="first_name" value={user.first_name} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Фамилия">
                                        <Input name="last_name" value={user.last_name} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Дата рождения">
                                        <Input name="birth_date" value={user.birth_date} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Пол">
                                        <Select defaultValue={user.gender} onChange={(value) => handleSelectChange2(value, 'gender')}>
                                            <Select.Option value="Мужской">Мужской</Select.Option>
                                            <Select.Option value="Женский">Женский</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Страна проживания">
                                        <Select defaultValue={user.country_id} onChange={(value) => handleSelectChange1(value, 'country_id')}>
                                            {countries.map(country => (
                                                <Select.Option key={country.country_id} value={country.country_id}>{country.country_name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Телефонный номер">
                                        <Input name="phone" value={user.phone} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Логин/Имя пользователя">
                                        <Input name="username" value={user.username} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Пароль">
                                        <Input.Password name="password" value={user.password} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Электронная почта">
                                        <Input name="email" value={user.email} onChange={handleChange} />
                                    </Form.Item>
                                </Form>
                                <Button type="primary" onClick={handleSave}>
                                    Сохранить
                                </Button>{' '}
                                <Button onClick={handleCancel}>Отмена</Button>
                            </div>
                        </div>
                    )}
                </>

            </div>
            
        </>
    );
};

export default UserPage;


