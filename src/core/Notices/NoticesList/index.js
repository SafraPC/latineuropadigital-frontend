import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NoticesCard from "../../../components/NoticesCard";
import {
  MyCardLink,
  MyFilteredOptions,
  MySideCardLink,
  Page,
  MyCardMap,
  MySideBarCard,
} from "../../../styles/default";
import imgTest from "../../../assets/icon.svg";

import api from "../../../services/api";
import Footer from "../../../components/Footer";
import { MyScreenView } from "./styles";
import { Link } from "react-router-dom";
import Select from "react-select";
import { MdFilterList } from "react-icons/md/index";

import Pagination from "../../../components/Pagination";
import CardCarousel from "../../../components/CardCarousel";

import { MdStar } from "react-icons/md";

function NoticesList() {

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [noticesMostViewed, setNoticesMostViewed] = useState([]);

  const [notices, setNotices] = useState([]);
  //const [tags, setTags] = useState([]);

  const [postsSideBar, setPostsSideBar] = useState([]);
  const [noticesSideBar, setNoticesSideBar] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
  const [totalNotices, setTotalNotices] = useState(0);
  /*
  const listTags = async () => {
    try {
      const response = await api.get("notices/tags");
      setTags(response.data.tags);
    } catch (error) {}
  };
  */
  
  const listNoticesSideBar = async () => {
    try {
      const response = await api.get("/notice/list?results=2&views=weekly");

      if (response.data.success) {
        if (response.data.notices) {
          let noticesSideBarDB = [];
          for (let index in response.data.notices) {
            const notice = response.data.notices[index];
            noticesSideBarDB.push({
              tag: notice.tags,
              id: notice._id,
              title: notice.title,
              subtitle: notice.content,
              image: `${process.env.REACT_APP_API_URL}` + notice.imagePath,
              icon: imgTest,
              views: notice.views,
            });
          }
          setNoticesSideBar(noticesSideBarDB);
        }
      }
    } catch (error) {
      setNoticesSideBar([]);
    }
  };

  const listSideBar = async () => {
    try {
      const response = await api.get("/featured/list?type=notice&results=3");

      if (response.data.success) {
        if (response.data.featureds) {
          let postsSideBarDB = [];
          for (let index in response.data.featureds) {
            const featuredPost = response.data.featureds[index].post;

            let postTitle = "Titulo não encontrado";

            if (featuredPost.title) {
              postTitle = featuredPost.title;
            } else if (featuredPost.businessName) {
              postTitle = featuredPost.businessName;
            } else if (featuredPost.eventName) {
              postTitle = featuredPost.eventName;
            }

            postsSideBarDB.push({
              id: featuredPost._id,
              title: postTitle,
              image:
                `${process.env.REACT_APP_API_URL}` + featuredPost.imagePath,
              postType: response.data.featureds[index].postType,
            });
          }
          setPostsSideBar(postsSideBarDB);
        }
      }
    } catch (error) {
      setPostsSideBar([]);
    }
  };

  useEffect(() => {

    const listNoticesMostViewed = async () => {
      try {
        const response = await api.get(
          "/notice/list?results=5&views=" + mostViewedAt
        );

        if (response.data.success) {
          if (response.data.notices) {
            let noticesMostViewedDb = [];
            for (let index in response.data.notices) {
              const notice = response.data.notices[index];
              noticesMostViewedDb.push({
                tag: notice.tags,
                id: notice._id,
                title: notice.title,
                subtitle: notice.content,
                image: `${process.env.REACT_APP_API_URL}` + notice.imagePath,
                icon: imgTest,
                views: notice.views,
              });
            }
            setNoticesMostViewed(noticesMostViewedDb);
          }
        }
      } catch (error) {
        setNoticesMostViewed([]);
      }
    }

    listNoticesMostViewed();
  }, [mostViewedAt]);

  useEffect(() => {

    const listNotices = async () => {
      try {
        const response = await api.get(
          "/notice/list?page=" + actualPage + "&results=" + qntResults
        );

        if (response.data.success) {
          if (response.data.notices) {
            let noticesDb = [];
            for (let index in response.data.notices) {
              const notice = response.data.notices[index];
              noticesDb.push({
                tag: notice.tags,
                id: notice._id,
                title: notice.title,
                subtitle: notice.content,
                image: `${process.env.REACT_APP_API_URL}` + notice.imagePath,
                icon: imgTest,
                date: notice.createdAt,
              });
            }
            setNotices(noticesDb);
          }
          if (response.data.totalNotices) {
            setTotalNotices(response.data.totalNotices);
          }
        }
      } catch (error) {}
    }

    listNotices();
  }, [actualPage, qntResults]);

  useEffect(() => {
    //listTags();
    listSideBar();
    listNoticesSideBar();
  }, []);

  return (
    <Page>
      <Header />
      <MyScreenView>
        <h1>Noticias y Actualidad</h1>

        <MyFilteredOptions>
          <Select
            placeholder={
              <MdFilterList
                style={{ marginLeft: "1rem" }}
                size={23}
                color="var(--color-freela-pink)"
              />
            }
            options={[
              { label: " Mais Visualizadas do Dia", value: "daily" },
              { label: " Mais Visualizadas da Semana", value: "weekly" },
              { label: " Mais Visualizadas do Mês", value: "monthly" },
              {
                label: " Mais Visualizadas de todos os tempos",
                value: "allTime",
              },
            ]}
            onChange={(e) => setMostViewedAt(e.value)}
          />
        </MyFilteredOptions>

        <CardCarousel items={noticesMostViewed} route={"/noticia"} />

        <div style={{ display: "block" }}>
          <MyCardMap>
            <h2 style={{ margin: "0 auto", width: "100%" }}>Reciente</h2>
            {notices.map((content, index) => {
              return (
                <MyCardLink key={index}>
                  <Link to={"/noticia/" + content.id}>
                    <NoticesCard
                      id={content.id}
                      tag={content.tag}
                      icon={content.icon}
                      image={content.image}
                      title={content.title}
                      text={content.subtitle}
                      date={content.date}
                    />
                  </Link>
                </MyCardLink>
              );
            })}
          </MyCardMap>

          <MySideCardLink>
            {postsSideBar.map((featured, index) => {
              let link = "/";

              switch (featured.postType) {
                case "Notice":
                  link = "/noticia/";
                  break;
                case "Directory":
                  link = "/diretorio/";
                  break;
                case "Event":
                  link = "/evento/";
                  break;
                case "Course":
                  link = "/curso/";
                  break;
                default:
                  break;
              }

              return (
                <Link to={link + featured.id} key={index}>
                  <MySideBarCard>
                    <img
                      src={featured.image}
                      onError={(image) => {
                        image.target.src = imgTest;
                      }}
                      alt={"Imagen del destacado "+featured.title}
                    />
                    <span>{featured.title}</span>
                    <MdStar size={30} color="yellow" />
                  </MySideBarCard>
                </Link>
              );
            })}
            {noticesSideBar.map((notice, index) => {
              return (
                <Link to={"/noticia/" + notice.id} key={index}>
                  <MySideBarCard>
                    <img
                      src={notice.image}
                      onError={(image) => {
                        image.target.src = imgTest;
                      }}
                      alt={"Imagen del actualidad "+notice.title}
                    />
                    <span>{notice.title}</span>
                  </MySideBarCard>
                </Link>
              );
            })}
          </MySideCardLink>
        </div>

        <Pagination
          totalResults={totalNotices}
          resultsPerPage={qntResults}
          actualPage={actualPage}
          changePage={setActualPage}
        />
      </MyScreenView>
      <Footer />
    </Page>
  );
}

export default NoticesList;
