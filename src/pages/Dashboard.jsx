import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeletePost from "./DeletePost";

import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import useTheme from "@context/ThemeContext";
import { UserContext } from "@/context/UserContext";
const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const {themeMode} = useTheme()

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser.role !== 'admin') {
      navigate('/')
    }
  })
  
  useEffect(() => {
    const fetchPosts = async () => {
     
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts`
        );
        setPostData(res?.data);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const uniqueTitles = [...new Set(postData.map((item) => item.title))];
  const uniqueConditions = [...new Set(postData.map((item) => item.condition))];
  const uniqueLocations = [...new Set(postData.map((item) => item.location))];

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const columns = [
    {
      title: "Imagen",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
          alt="Imagen"
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
      width: "30%",
    },
    {
      title: "Título",
      dataIndex: "title",
      filters: uniqueTitles.map((title) => ({
        text: title,
        value: title,
      })),
      filterMode: "tree",
      filterSearch: true,

      onFilter: (value, record) => record.title === value,
      width: "20%",
      render: (text) => truncateText(text, 25),
    },
    {
      title: "Descripción",
      dataIndex: "content",
      width: "20%",
      render: (text) => truncateText(text, 50),
    },
    {
      title: "Localización",
      dataIndex: "location",
      filters: uniqueLocations.map((location) => ({
        text: location,
        value: location,
      })),
      onFilter: (value, record) => record.location == value,
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Condición",
      dataIndex: "condition",
      filters: uniqueConditions.map((condition) => ({
        text: condition,
        value: condition,
      })),
      onFilter: (value, record) => record.condition === value,
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/post/${record._id}/detail`}>
            <Button type={`${themeMode === 'dark' ? 'primary' : 'default'}`} icon={<EyeOutlined />}>
              Ver
            </Button>
          </Link>
          
          <DeletePost postID={record._id} />
        </Space>
      ),
      width: "20%",
    },
  ];

  return (
    <div className="grid place-content-center w-[80%] m-auto mb-[15rem] z-[-1000] md:ml-[6rem] lg:min-h-screen">
     <FadeAnimation className={'overflow-x-auto lg:overflow-hidden'}>
        <Space
          style={{
            marginBottom: 16,
            marginTop: 90,
          }}
        >
        
          <Link to="/dashboard/users">
            <Button type={`${themeMode === 'dark' ? 'primary' : 'default'}`}>Administrar usuarios</Button>
          </Link>
        </Space>

        <Table
          columns={columns}
          dataSource={postData}
          loading={loading}
          onChange={handleChange}
          pagination={{ pageSize: 7 }}
          className={`${themeMode === 'dark' ? 'dark' : ''} table`}
          filterDropdownStyle={{
            backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#333',
          }}
          rowKey={(record) => record._id}
        />
      </FadeAnimation>
    </div>
  );
};

export default Dashboard;
