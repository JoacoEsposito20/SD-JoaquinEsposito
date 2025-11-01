import Link from 'next/link';
import { useAddFavorite, useRemoveFavorite } from '../hooks/useFavorites';
import React from 'react';

type PokemonProps = {
    // id > 0 si es un favorito, id <= 0 si no lo es
    id:number; 
    name:string;
    url:string;
}

export default function PokemonItem({id,name,url}:PokemonProps){
    const addMutation = useAddFavorite();
    const removeMutation = useRemoveFavorite();
    
    const isPending = addMutation.isPending || removeMutation.isPending;
    const isError = addMutation.isError || removeMutation.isError;
    const error = addMutation.error || removeMutation.error;

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isPending) return;

        if(id > 0){
            removeMutation.mutate(id);
        }else{
            addMutation.mutate({name,url})
        }
    }

    // ⭐ Determinar el contenido del botón basado en el estado `id` (prop que viene de la lista)
    const buttonContent = isPending ? '⏳' : (id > 0 ? '⭐' : '☆');
    const isDisabled = isPending;

    return(
        <Link href={`/pokemon/${name}`} passHref className="block h-full">
            <main
                className="border p-3 rounded-lg shadow-md transition-shadow duration-200 hover:shadow-xl cursor-pointer h-full flex flex-col justify-between"
                role="button"
                tabIndex={0}
            >
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold font-sans capitalize">{name}</h1>
                </div>

                {/* ⭐ Botón de Favoritos Modificado */}
                <button
                    onClick={handleAdd}
                    disabled={isDisabled}
                    className="self-end" 
                    style={{ 
                        cursor: isDisabled ? 'not-allowed' : 'pointer', 
                        background: 'none', 
                        border: 'none', 
                        fontSize: '1.5rem',
                        opacity: isDisabled ? 0.6 : 1, 
                        margin: '0', padding: '0' 
                    }}
                    title={isDisabled ? 'Procesando...' : (id > 0 ? 'Quitar de favoritos' : 'Agregar a favoritos')}
                >
                    {buttonContent} 
                </button>

                {/* ⭐ Manejo y Muestra de Errores */}
                {isError && (
                    <p className="text-red-500 text-sm mt-2">
                        **Error al procesar:** {error ? String(error) : 'Algo salió mal.'}
                    </p>
                )}
            </main>
        </Link>
    );
}