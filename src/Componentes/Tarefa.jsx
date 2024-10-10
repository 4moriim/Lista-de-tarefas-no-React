import React, { useState } from 'react';

const Tarefa = ({ tarefa, excluirTarefa, concluirTarefa, editarTarefa, retornarTarefa }) => {
  const [estaEditando, setEstaEditando] = useState(false);
  const [novoTexto, setNovoTexto] = useState(tarefa.texto);

  const manipulacao = () => {  //Utilizado para editar o texto da tarefa ao clicar no botão salvar
    editarTarefa(tarefa.id, novoTexto);
    setEstaEditando(false);
  }

  return (
    <div className="tarefa">
      <div className="conteudo" style={{ textDecoration: tarefa.estaConcluido ? "line-through" : "" }}>
        {estaEditando ? (
          <>
            <input
              type='text'
              value={novoTexto}
              onChange={(evento) => setNovoTexto(evento.target.value)}
              placeholder="Novo texto"
            />
          </>
        ) : (
          <>
            <p>{tarefa.texto}</p>
          </>
        )}
      </div>
      <div className='botoes'>
        {estaEditando ? (
          <>
            <button className='salvar' onClick={manipulacao}>Salvar</button>
            <button className='cancelar' onClick={() => setEstaEditando(false)}>Cancelar</button>
          </>
        ) : (
          <>
            {!tarefa.estaConcluido && (
              <button className='completar' onClick={() => concluirTarefa(tarefa.id)}>Completar</button>
            )}
            <button className='remover' onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
            <button className="editar" onClick={() => setEstaEditando(true)}>Editar</button>
            {tarefa.estaConcluido && (
              <button className='retornar' onClick={() => retornarTarefa(tarefa.id)}>Retornar</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Tarefa;
