import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import Select from 'react-select';
import {MdFileUpload} from 'react-icons/md/index'
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying"
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';

function CourseRegister() {

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [link,setLink]= useState();

  //For open modal

  const[modalShow,setModalShow] = useState(false);
  const [previewImage,setPreviewImage] = useState();

  async function listTags() {
    try {
      const response = await api.get("/tags/course");

      if(response.data.success) {
        if(response.data.tags) {
          let dbTags = [];
          for(let index in response.data.tags) {
            dbTags.push(response.data.tags[index].title);
          }
          setDbTags(dbTags);
        }
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    listTags();
  }, []);

  const handleCourseRegister = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('image', image);
    tags.map((tag) => {
      formData.append('tags', tag);
    })
    
    try {
      
      await api.post("/course/create", formData);
      toast.success("¡Registrado correctamente!",TOASTIFY_OPTIONS)
    } catch (error) {
        toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
    }

  };

  const onChangeSelectTags = (tagsSelected) => {
    let tags = [];
    for(const tag of tagsSelected) {
      tags.push(tag.value);
    }
    setTags(tags);
  }


  const handleChangeTags = (e)=>{
    e.preventDefault();
    setModalShow(true);
  }

  return (
  <Page>
    <Toastifying/>
    {modalShow && <ModalTag
    show={modalShow}
    onHide={()=>setModalShow(false)}
    />}
    <Header/>
    <Form width={"45%"} height={"80vh"} center>
      <ContentView>
        <label>¡Crea un curso!</label>

        <input
          placeholder="Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <input
          placeholder="Subtítulo"
          type="text"
           onChange={(e) => {
            setSubtitle(e.target.value);
          }}
          value={subtitle}
        />

        <textarea
          placeholder="Contenido"
          type="text"
           onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />


        <div>
        <label for="uploadPhoto" class="btn-cta">
          {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
        <MdFileUpload/>
        </label>
        <input
           id="uploadPhoto"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            if(e.target.files[0]){
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
       { image && <img src={previewImage}/>}
       </div>
          
       <input type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />


        <fieldset>
        <Select
         options={dbTags.map((currentTag)=>(
          {label:currentTag,value:currentTag}))}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Seleccionar Etiquetas"}
        />

        </fieldset>
        <Outline_Button type="success" onClick={handleChangeTags}>Añadir Etiqueta</Outline_Button>

        <AppButton onClick={handleCourseRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default CourseRegister;