import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  MyFilteredOptions, Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';
import Select from 'react-select';

import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';

import { Link } from 'react-router-dom';
import { MdFilterList } from 'react-icons/md';

import Pagination from '../../../components/Pagination';
import { MyScreenView } from '../DirectoryList/styles';

function DirectoryPendents() {

  const [directoriesFeatured, setDirectoriesFeatured] = useState([]);

  const [directories, setDirectories] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalDirectories, setTotalDirectories] = useState(0);
 
  const listDirectories = async () => {
    try {

      const response = await api.get("/directories/pendent");

      if(response.data.success) {
        if(response.data.directories) {
          let directoriesDb = [];
          for(let index in response.data.directories) {
            const directory = response.data.directories[index];
            directoriesDb.push({ tag : directory.tags,id: directory._id, title: directory.businessName, subtitle: directory.businessAdress, image: `${process.env.REACT_APP_API_URL}`+directory.imagePath, icon: imgTest});
          }
          setDirectories(directoriesDb);
        }
        if (response.data.totalDirectories) {
          setTotalDirectories(response.data.totalDirectories);
        }
      }

    } catch (error) {
      
          
    }
  }

  useEffect(() => {
    listDirectories();
  }, [actualPage]);

  return (
      <Page>
        <Header/>
        <MyScreenView >
        <h1>Directorios Pendentes</h1>

        <div style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {directories.map((content) => {
          return (
            <Link to={"/diretorio/" + content.id}>
              <NoticesCard
                id={content.id}
                icon={content.icon}
                image={content.image}
                title={content.title}
                text={content.subtitle}
              />
            </Link>
          );
        })}
        </div>

        <Pagination totalResults={totalDirectories} resultsPerPage={30} actualPage={actualPage} changePage={setActualPage}/>

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default DirectoryPendents;