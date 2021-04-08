import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page, ProgressBar } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import {MdFileUpload} from 'react-icons/md/index';
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying";
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';
import MyModal from '../../../components/MyModal';

import Select from 'react-select';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

import { FormBlock, FormColumn, FormGroup, Required, CharLimit } from './styles';

function DirectoryEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idDirectory] = useState(props.match.params.id);

  const [businessName, setBusinessName] = useState("");
  const [businessAdress, setBusinessAdress] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessProvince, setBusinessProvince] = useState("");
  const [businessPostalCode, setBusinessPostalCode] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactRole, setContactRole] = useState("");

  const [status, setStatus] = useState("");

  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);

  const [image, setImage] = useState('');
  const [previewImage,setPreviewImage] = useState();
  const [progress, setProgess] = useState(0);

  const handleValidator =  useMyForm(
    businessName,
    businessAdress,
    businessCity,
    businessProvince,
    businessPostalCode,
    businessPhone,
    businessDescription,
    contactName,
    contactPhone,
    contactEmail,
    contactRole
  );
  const handleLinkValidator = verifyLink(businessWebsite);

  async function listTags() {
    try {
      const response = await api.get("/tag/list");

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
      console.log(error);
    }
  }

  async function getDirectory() {
    try {
      const response = await api.get("/directory/"+idDirectory);

      if(response.data.success) {
        if(response.data.directory) {
          setBusinessName(response.data.directory.businessName);
          setBusinessAdress(response.data.directory.businessAdress);
          setBusinessCity(response.data.directory.businessCity);
          setBusinessProvince(response.data.directory.businessProvince);
          setBusinessPostalCode(response.data.directory.businessPostalCode);
          setBusinessPhone(response.data.directory.businessPhone);
          setBusinessWebsite(response.data.directory.businessWebsite);
          setBusinessDescription(response.data.directory.businessDescription);
          setContactName(response.data.directory.contactName);
          setContactPhone(response.data.directory.contactPhone);
          setContactEmail(response.data.directory.contactEmail);
          setContactRole(response.data.directory.contactRole);
          setTags(response.data.directory.tags);
          setStatus(response.data.directory.status);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getDirectory();
    listTags();

  }, []);

  const handleDirectoryEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
    if(handleValidator){
      try {
        const formData = new FormData();
        formData.append('businessName', businessName);
        formData.append('businessAdress', businessAdress);
        formData.append('businessCity', businessCity);
        formData.append('businessProvince', businessProvince);
        formData.append('businessPostalCode', businessPostalCode);
        formData.append('businessPhone', businessPhone);
        formData.append('businessWebsite', businessWebsite);
        formData.append('businessDescription', businessDescription);
        formData.append('contactName', contactName);
        formData.append('contactPhone', contactPhone);
        formData.append('contactEmail', contactEmail);
        formData.append('contactRole', contactRole);
        formData.append('status', status);
        formData.append('image', image);
        tags.map((tag) => {
          formData.append('tags', tag);
        });
        
        const response = await api.put("/directory/"+idDirectory, formData, {
          onUploadProgress: (ProgressCourse) => {
            let progress = Math.round(ProgressCourse.loaded / ProgressCourse.total * 100) + '%';
            setProgess(progress);
          }
        });

        setButtonText("Editado com Sucesso");
      } catch (error) {
        setButtonText("Tente Novamente");

        console.log(error);
      }
    }else{
      setButtonText("Tente Novamente");
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

  return (
  <Page>
    <Toastifying/>
    <Header/>
    <Form width={"80%"} height={"80vh"} center>
      
        <label>Editar Diretorio</label>

        <FormBlock>
          <h4>BUSINESS INFORMATION</h4>
          <FormColumn>
            <FormGroup>
              <label>Business Name<Required>*</Required></label>
              <input               
                type="text"
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
                value={businessName}
              />
            </FormGroup>
            <FormGroup>
              <label>City<Required>*</Required></label>
              <input                
                type="text"
                onChange={(e) => {
                  setBusinessCity(e.target.value);
                }}
                value={businessCity}
              />
            </FormGroup>
            <FormGroup>
              <label>Postal Code<Required>*</Required></label>
              <input                
                type="text"
                onChange={(e) => {
                  setBusinessPostalCode(e.target.value);
                }}
                value={businessPostalCode}
              />
            </FormGroup>
            <FormGroup>
              <label>Phone 2</label>
              <input
                
                type="text"
                placeholder="Atribui nada pq nao existe no BCD"
              />
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <label>Address<Required>*</Required></label>
              <input               
                type="text"
                onChange={(e) => {
                  setBusinessAdress(e.target.value);
                }}
                value={businessAdress}
              />
            </FormGroup>
            <FormGroup>
              <label>Province<Required>*</Required></label>
              <fieldset>
                <Select
                  options={[
                    {label: 'Portugal', value: 'Portugal'},
                    {label: 'Espanha', value: 'Espanha'},
                    {label: 'França', value: 'França'}

                  ]}
                  isClearable
                  closeMenuOnSelect={false}
                  onChange={(e) => {setBusinessProvince(e.value)}}
                  placeholder={"¡Seleccione a Provincia!"}
                />
              </fieldset>
            </FormGroup>
            <FormGroup>
              <label>Phone<Required>*</Required></label>
              <input
                
                type="text"
                onChange={(e) => {
                  setBusinessPhone(e.target.value);
                }}
                value={businessPhone}
              />
            </FormGroup>
            <FormGroup>
              <label>Website</label>
              <input               
                type="text"
                onChange={(e) => {
                  setBusinessWebsite(e.target.value);
                }}
                value={businessWebsite}
              />
            </FormGroup>

          </FormColumn>
          <FormGroup>
            <label>Business Description<Required>*</Required></label>
            <textarea            
              type="text"
              onChange={(e) => {
                setBusinessDescription(e.target.value);
              }}
              value={businessDescription}
            />
            <CharLimit>
              <span>400 characters limit. {businessDescription.length < 400 ? 400-businessDescription.length+" characters left": "Limit characters reached"} </span>
            </CharLimit>
          </FormGroup>
          
        </FormBlock>

        <hr />
       
        <FormBlock>
          <h4>CONTACT INFORMATION</h4>
          <FormColumn>
            <FormGroup>
              <label>Full Name<Required>*</Required></label>
              <input              
                type="text"
                onChange={(e) => {
                  setContactName(e.target.value);
                }}
                value={contactName}
              />
            </FormGroup>
            <FormGroup>
              <label>Email<Required>*</Required></label>
              <input                
                type="text"
                onChange={(e) => {
                  setContactEmail(e.target.value);
                }}
                value={contactEmail}
              />
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <label>Phone Number<Required>*</Required></label>
              <input
                type="text"
                onChange={(e) => {
                  setContactPhone(e.target.value);
                }}
                value={contactPhone}
              />
            </FormGroup>
            <FormGroup>
              <label>Which is your role?<Required>*</Required></label>
              <fieldset>
                <Select
                  options={[
                    {label: 'Business Owner', value: 'Business Owner'},
                    {label: 'Business Manager', value: 'Business Manager'}
                  ]}
                  isClearable
                  closeMenuOnSelect={false}
                  onChange={(e) => {setContactRole(e.value)}}
                  placeholder={"¡Seleccione!"}
                />
              </fieldset>
            </FormGroup>
          </FormColumn>
          <FormGroup>
            <label>Tags<Required>*</Required></label>
            <fieldset>
              <Select
               options={dbTags.map((currentTag)=>(
                {label:currentTag,value:currentTag}))}
                isClearable
                isMulti
                closeMenuOnSelect={false}
                onChange={onChangeSelectTags}
                placeholder={"¡Seleccione las etiquetas!"}
              />
            </fieldset>
          </FormGroup>
           <FormGroup>
            <label>Status</label>
            <fieldset>
              <select value={status} onChange={(e) => {setStatus(e.target.value)}}>
                <option value="pendent">Pendente</option>
                <option value="accepted">Aceita</option>
              </select>
            </fieldset>
          </FormGroup>
          <ContentView>
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
          </ContentView>
          <ProgressBar width={progress}>
            {progress}
          </ProgressBar>
        </FormBlock>

        <button className="btn btn-primary btn-lg btn-block" onClick={handleDirectoryEdit}>{buttonText}</button>
    </Form>
    <Footer/>
  </Page>);
}

export default DirectoryEdit;