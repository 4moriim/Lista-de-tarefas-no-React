import { useState, useEffect } from 'react';
import Tarefa from './Componentes/Tarefa';
import CriarTarefa from './Componentes/CriarTarefa';
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');   //Salva as tarefas caso a página atualize
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];   //Transforma as tarefas salvas em um objeto
  });

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));  //Tranforma as tarefas em String
  }, [tarefas]);

  const listarTarefa = (texto) => {
    const novasTarefas = [      //Lista as tarefas que serão criadas nesse formato que tenha id único, texto e uma variável booleana
      ...tarefas,
      {
        id: Math.floor(Math.random() * 10000),
        texto,
        estaConcluido: false,
      },
    ];

    setTarefas(novasTarefas);
  };

  const excluirTarefa = (id) => {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);  //Verifica o id das tarefas e exclui a partir da identificação do id
    setTarefas(novasTarefas);
  };

  const concluirTarefa = (id) => {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, estaConcluido: !tarefa.estaConcluido } : tarefa  //A tarefa está concluída quando a condição da variável estaConcluido é true
    );
    setTarefas(novasTarefas);
  };

  const editarTarefa = (id, novoTexto) => {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, texto: novoTexto } : tarefa // altera o texto de cada tarefa a partir da identificação do ID
    );
    setTarefas(novasTarefas);
  };

  const retornarTarefa = (id) => {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, estaConcluido: false } : tarefa  // retorna a tarefa para a lista de tarefas caso o usuário conclua a tarefa por engano
    );
    setTarefas(novasTarefas);
  };

  const tarefasPendentes = tarefas.filter(tarefa => !tarefa.estaConcluido);
  const tarefasConcluidas = tarefas.filter(tarefa => tarefa.estaConcluido);

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>

      <div className="lista-tarefas">
        {tarefasPendentes.length === 0 ? (
          <p>Não há tarefas pendentes.</p> //Quando a lista de tarefas está vazia, essa mensagem aparece
        ) : (
          tarefasPendentes.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} excluirTarefa={excluirTarefa} concluirTarefa={concluirTarefa} editarTarefa={editarTarefa} />
          ))
        )}
      </div>

      {tarefasConcluidas.length > 0 && ( //Se houver alguma tarefa concluída, a área de Tarefas concluídas será mostrada
        <div className="lista-tarefas">
          <h2>Tarefas Concluídas</h2>
          {tarefasConcluidas.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa} retornarTarefa={retornarTarefa} />
          ))}
        </div>
      )}

      <CriarTarefa listarTarefa={listarTarefa} />
    </div>
  );
}

export default App;


