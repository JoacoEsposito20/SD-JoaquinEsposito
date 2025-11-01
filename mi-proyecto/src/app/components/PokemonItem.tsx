import Link from 'next/link';
import { useAddFavorite, useRemoveFavorite } from '../hooks/useFavorites';
import { url } from 'inspector';

type PokemonProps = {
    id:number;
    name:string;
    url:string;
}

export default function PokemonItem({id,name,url}:PokemonProps){
    const addMutation = useAddFavorite();
    const removeMutation = useRemoveFavorite();
    let isPending = false;
    let isError = false;
    let error = null;

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(id > 0){
            removeMutation.mutate(id);
            isPending = removeMutation.isPending;
            isError = removeMutation.isError;
            error = removeMutation.error;
        }else{
            addMutation.mutate({name,url})
            isPending = addMutation.isPending;
            isError = addMutation.isError;
            error = addMutation.error;
        }
        isPending = false;
    }

    
    const buttonContent = isPending ? '⏳' : (id>0 ? '⭐' : '☆');

    return(
        <Link href={`/pokemon/${name}`} passHref className="block h-full">
            <main
                className="border p-3 rounded-lg shadow-md transition-shadow duration-200 hover:shadow-xl cursor-pointer h-full"
                role="button"
                tabIndex={0}
            >
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold font-sans capitalize">{name}</h1>
                </div>

                {/* ⭐ Botón de Favoritos Modificado */}
                <button
                    onClick={handleAdd}
                    style={{ 
                        cursor: isPending ? 'not-allowed' : 'pointer', 
                        background: 'none', 
                        border: 'none', 
                        fontSize: '1.5rem',
                        opacity: isPending ? 0.6 : 1 // Opacidad para indicar "deshabilitado"
                    }}
                    title={isPending ? 'Procesando...' : (id>0 ? 'Quitar de favoritos' : 'Agregar a favoritos')}
                >
                    {buttonContent} 
                </button>

                {/* ⭐ Manejo y Muestra de Errores */}
                {isError && (
                    <p className="text-red-500 text-sm mt-2">
                        **Error al procesar:** {error || 'Algo salió mal.'}
                    </p>
                )}
            </main>
        </Link>
    );
}