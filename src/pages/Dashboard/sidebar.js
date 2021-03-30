import React from "react";

import { SidebarStyled } from "./styles";

function Sidebar(props) {
  return (
    <SidebarStyled>
      <div onClick={props.noticia}>
        <span>Notícias</span>
      </div>
      <div onClick={props.diretorio}>
        <span>Diretórios</span>
      </div>
      <div onClick={props.evento}>
        <span>Agenda</span>
      </div>
      <div onClick={props.usuario}>
        <span>Usuários</span>
      </div>
      <div onClick={props.oportunidade}>
        <span>Oportunidades</span>
      </div>
      <div onClick={props.tag}>
        <span>Tags</span>
      </div>
    </SidebarStyled>
  );
}

export default Sidebar;
