import { FormEvent, useState } from "react";
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/TransactionsContext';
import closeImg from '../../assets/close.svg';
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";


import { Container, TransactionTypeContainer, RadioBox } from "./styles"

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

type Type = "deposit" | "withdraw";

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [type, setType] = useState<Type>("deposit");
    const [title, setTitle] = useState('');
    const [amount, setAmout] = useState(0);
    const [category, setCategory] = useState('');  
    
    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({ type, title, amount, category });

        setType('deposit');
        setTitle('');
        setAmout(0);
        setCategory('');
        
        onRequestClose();
    }
    
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder="Título"
                    value={ title }
                    onChange={({ target }) => setTitle(target.value)}
                />
                <input
                    placeholder="Valor"
                    type="number"
                    value={ amount }
                    onChange={({ target }) => setAmout(Number(target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === "deposit"}
                        activeColor="green"
                        onClick={() => setType("deposit")}
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        isActive={type === "withdraw"}
                        activeColor="red"
                        onClick={() => setType("withdraw")}
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={({ target }) => setCategory(target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}