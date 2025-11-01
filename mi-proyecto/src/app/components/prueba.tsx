"use client";
import { useAddFavorite, useRemoveFavorite } from '../hooks/useFavorites';

export default function Prueba(){
    const addMutation = useAddFavorite();
    const text = "Boton prueba";
    const disabled = false;

    const onClick = () => {
        addMutation.mutate({name:"bulbasur", url:"12345678"});
    }
    
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                backgroundColor: disabled ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                margin: '10px 0'
            }}
        >
            {text}
        </button>
    );
}