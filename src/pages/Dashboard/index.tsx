import React, { useState, useEffect, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { Title, Form, Repositories, Error } from "./styles";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

interface Repository {
   full_name: string;
   owner: {
      login: string;
      avatar_url: string;
   };
   description: string;
}

const Dashboard: React.FC = () => {
   const [newRepo, setNewRepo] = useState("");
   const [inputError, setInputError] = useState("");
   const [repositories, setRepositories] = useState<Repository[]>(() => {
      const storedRepositories = localStorage.getItem(
         "@GitHubExplorer:repositories"
      );

      if (storedRepositories) {
         return JSON.parse(storedRepositories);
      }

      return [];
   });

   useEffect(() => {
      localStorage.setItem(
         "@GitHubExplorer:repositories",
         JSON.stringify(repositories)
      );
   }, [repositories]);

   async function handleAddRepository(
      event: FormEvent<HTMLFormElement>
   ): Promise<void> {
      event.preventDefault();

      if (!newRepo) {
         setInputError("Type the author/name of the repository.");

         return;
      }

      try {
         const response = await api.get<Repository>(`/repos/${newRepo}`);

         const repository = response.data;

         setRepositories([...repositories, repository]);
         setNewRepo("");
         setInputError("");
      } catch (err) {
         setInputError("Something went wrong...");
      }
   }

   return (
      <>
         <img src={logoImg} alt="logo.svg" />
         <Title>Explore repositories on GitHub</Title>

         <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input
               placeholder="Type the repository's name."
               value={newRepo}
               onChange={(e) => setNewRepo(e.target.value)}
            />
            <button type="submit">Search</button>
         </Form>

         {inputError && <Error>{inputError}</Error>}

         <Repositories>
            {repositories.map((repository) => (
               <Link
                  to={`/repository/${repository.full_name}`}
                  key={repository.full_name}
               >
                  <img
                     src={repository.owner.avatar_url}
                     alt={repository.owner.login}
                     key={repository.full_name}
                  />
                  <div>
                     <strong>{repository.full_name}</strong>
                     <p>{repository.description}</p>
                  </div>

                  <FiChevronRight size={20} />
               </Link>
            ))}
         </Repositories>
      </>
   );
};

export default Dashboard;
