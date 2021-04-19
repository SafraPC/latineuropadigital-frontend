import React, { useState, useEffect } from "react";

import Header from "../../../components/Header";
import { MyCardLink, Page } from "../../../styles/default";

import api from "../../../services/api";
import Footer from "../../../components/Footer";
import { MyScreenView } from "./styles";
import { Link } from "react-router-dom";
import NoticesCard from "../../../components/NoticesCard";

function Job(props) {
  const description =
    "Professional Name: " +
    props.job.professionalName +
    "Descrição : " +
    props.job.description +
    "Contato : " +
    props.job.professionalContact;

  return (
    <MyCardLink>
      <Link to={" + content.id"}>
        <NoticesCard date={""} title={props.job.title} text={description} />
      </Link>
    </MyCardLink>
  );
}

function OpportunitieList(props) {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  async function listJobs() {
    try {
      const response = await api.get("/job/list");

      if (response.data.success) {
        if (response.data.jobs) {
          setJobs(response.data.jobs);
        }
      }
    } catch (error) {
      setErrors({ message: "Não foi possível carregar as Oportunidades" });
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.message) {
            setErrors({ message: error.response.data.message });
          }
        }
      }
    }
  }

  useEffect(() => {
    listJobs();
  }, []);

  return (
    <Page>
      <Header />
      <MyScreenView>
        <h1>Oportunidades</h1>

        {jobs.map((currentjob) => (
          <Job job={currentjob} />
        ))}
      </MyScreenView>
      <Footer />
    </Page>
  );
}

export default OpportunitieList;
