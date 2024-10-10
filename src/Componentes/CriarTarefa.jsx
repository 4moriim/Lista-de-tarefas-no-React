import { useState } from 'react';

function CriarTarefa({ listarTarefa }) {
    const [valor, setValor] = useState("");

    const submit = (evento) => {  //Responsável por encaminhar a tarefa para a área de lista de tarefas
        evento.preventDefault();
        if (!valor) return;

        listarTarefa(valor);
        setValor("");
    }

    return (
        <div className='criar-tarefa-form'>  
            <h2>Criar tarefa:</h2>
            <form onSubmit={submit}>
                <input
                    type="text"
                    placeholder='Digite a tarefa'
                    valor={valor}
                    onChange={(evento) => setValor(evento.target.value)}
                />
                <button type='submit'>Criar tarefa</button>
            </form>

        </div>
    )
}

export default CriarTarefa;