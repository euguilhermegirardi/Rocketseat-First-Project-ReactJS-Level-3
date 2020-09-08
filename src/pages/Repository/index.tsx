import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Header, RepositoryInfo, Issues } from "./styles";
import logoImg from "../../assets/logo.svg";

interface RepositoryParams {
   repository: string;
}

const Repository: React.FC = () => {
   const { params } = useRouteMatch<RepositoryParams>();

   return (
      <>
         <Header>
            <img src={logoImg} alt="logo.svg" />
            <Link to="/">
               <FiChevronLeft />
               Go Back
            </Link>
         </Header>

         <RepositoryInfo>
            <header>
               <img
                  src="https://avatars3.githubusercontent.com/u/48716406?s=460&u=775b5cd15d0f20dc3dcc59b4a98b8d6f698d1085&v=4"
                  alt="sdsd"
               />
               <div>
                  <strong>Girardi</strong>
                  <p>asdasd</p>
               </div>
            </header>
            <ul>
               <li>
                  <strong>1890</strong>
                  <span>Stars</span>
               </li>
               <li>
                  <strong>34</strong>
                  <span>Forks</span>
               </li>
               <li>
                  <strong>43</strong>
                  <span>Opened Issues</span>
               </li>
            </ul>
         </RepositoryInfo>

         <Issues>
            <Link to="dasdas">
               <div>
                  <strong>asdasd</strong>
                  <p>dasdasds</p>
               </div>

               <FiChevronRight size={20} />
            </Link>
         </Issues>
      </>
   );
};

export default Repository;
