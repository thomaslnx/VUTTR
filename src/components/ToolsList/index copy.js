import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import { PopupboxContainer, PopupboxManager } from 'react-popupbox';

import api from '../../services/api';

import { Wrapper, FormContainer, ToolList, LightBoxWrapper } from './styles';

function ToolsList() {
  const [toolList, setToolList] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [check, setCheck] = useState(false);
  const [indice, setIndice] = useState([]);

  useEffect(() => {
    async function tools() {
      const response = await api.get('/tools');

      if (response.data) {
        setToolList([...toolList, response.data]);
      }
    }

    tools();
  }, []);

  /*
   *** Add tool to fake database
   */
  function addTool(e) {
    e.preventDefault();
    const formData = e.target;

    const { toolname, toollink, tooldescription, tooltags } = formData;
    const tagArray = tooltags.value.split(',');

    const listTags = tagArray.map((tag) => tag.trim());

    api.post('/tools', {
      title: toolname.value,
      link: toollink.value,
      description: tooldescription.value,
      tags: listTags,
    });

    PopupboxManager.close();

    window.location.reload();
  }

  /*
   *** Remove tool based on his ID
   */
  function removeTool(id) {
    const confirmRemoveTool = window.confirm(
      // Refatorar esse trecho de codigo
      'Quer mesmo remover essa ferramenta?'
    );
    if (confirmRemoveTool === true) {
      api.delete(`/tools/${id}`);
    }

    window.location.reload();
  }

  function handleCheck() {
    setCheck(true);
  }

  /*
   *** Search tool by tag
   */
  const searchByTag = async (e) => {
    const searchInput = e.target.value;

    let currentList = [];
    let newList = [];
    setSearch(e.target.value);

    // CODIGO FUNCIONAL
    if (searchInput !== '') {
      currentList = await api.get('/tools');

      newList = currentList.data
        .map((tag) => tag.tags)
        .map((item) =>
          item.filter((tool) => {
            const lowerCase = tool.toLowerCase();
            const filter = searchInput.toLowerCase();
            return lowerCase.includes(filter);
          })
        );
    } else {
      setFiltered(toolList);
    }

    /**
     * Retorna o indice do array que contém a tag pesquisada
     ***/
    function indexesOf(array, tag) {
      let indexes = new Array();

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (array[i][j].includes(tag)) {
            indexes.push(i);
          }
        }
      }
      setIndice(indexes);
      return indexes;
    }

    console.log(
      'Valor do retorno da função indexesOf: ',
      indexesOf(newList, searchInput)
    );

    setFiltered(newList);
  };

  /*
   *** Shows the lightbox with form to add tool
   */
  function lightBox() {
    const content = (
      <LightBoxWrapper>
        <span>
          <FaPlus />
          Add New Tool
        </span>

        <form onSubmit={(event) => addTool(event)}>
          <span className="name"> Tool Name</span>
          <input name="toolname" required />

          <span className="link"> Tool Link</span>
          <input name="toollink" required />

          <span className="description"> Tool Description</span>
          <textarea name="tooldescription" required />

          <span className="tags"> Tags </span>
          <input name="tooltags" required />

          <button type="submit">Add Tool</button>
        </form>
      </LightBoxWrapper>
    );

    PopupboxManager.open({ content });
  }

  function handleSubmit(e) {
    e.preventDefault();
    lightBox();
  }

  return (
    <Wrapper>
      <FormContainer>
        <form>
          <div className="input-container">
            <FaSearch />
            <input
              className="search"
              type="text"
              placeholder="Search tool"
              value={search}
              onChange={searchByTag}
            />

            <label htmlFor="searchtags">
              <input
                onClick={handleCheck}
                className="boxcheck"
                type="checkbox"
                id="searchtags"
              />
              <span>search in tags only</span>
            </label>
          </div>
          <button type="button" onClick={handleSubmit}>
            <FaPlus /> Add
          </button>
        </form>

        <PopupboxContainer />
      </FormContainer>

      <ToolList>
        {toolList && toolList.length > 0 ? (
          toolList.map((tools, index) => (
            <ul key={index}>
              {search === ''
                ? tools.map((item) => (
                    <li key={item.id}>
                      <span className="toolTitle">
                        <a href={item.link}>{item.title}</a>
                        <button
                          type="button"
                          onClick={() => removeTool(item.id)}
                        >
                          <FaTimes />
                          remove
                        </button>
                      </span>
                      <span className="toolDescription">
                        {item.description}
                      </span>

                      <span className="toolTags">
                        {item.tags.map((item) => `#${item}  `)}
                      </span>
                    </li>
                  ))
                : toolList.map((item) => {
                    const lista = [];

                    for (let i = 0; i < indice.length; i++) {
                      const control = indice[i];
                      lista.push(
                        <li key={item[control].id}>
                          <span className="toolTitle">
                            <a href={item[control].link}>
                              {item[control].title}
                            </a>
                            <button
                              type="button"
                              onClick={() => removeTool(item[control].id)}
                            >
                              <FaTimes />
                              remove
                            </button>
                          </span>
                          <span className="toolDescription">
                            {item[control].description}
                          </span>

                          <span className="toolTags">
                            {item[control].tags.map((item) => `#${item}  `)}
                          </span>
                        </li>
                      );
                      return lista[i];
                    }
                  })}
            </ul>
          ))
        ) : (
          <div className="empty">
            <span className="title">Lista de Ferramentas Vazia</span>
            <span> Click no botão Add e adicione ferramentas</span>
          </div>
        )}
      </ToolList>
    </Wrapper>
  );
}

export default ToolsList;