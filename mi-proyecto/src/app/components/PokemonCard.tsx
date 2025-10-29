type PokemonReference = {
    name: string;
    url: string;
}

type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

type TypeDetail = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

type PokemonData = {
    name: string;
    abilities: Ability[];
    spriteUrl: string | null;
    types: TypeDetail[];
}



export default function PokemonItem({ name, abilities, spriteUrl,types}: PokemonData){
    return(
        <div className="border p-6 rounded-lg shadow-xl w-80 flex flex-col items-center space-y-4 bg-white dark:bg-gray-800">
            <div className="w-40 h-40 pt-4 bg-gray-100 rounded-lg flex items-center justify-center">
                {spriteUrl ? (
                    <img 
                    src={spriteUrl} 
                    alt={`Sprite de ${name}`}
                    className="w-full h-full object-contain"
                    />
                ) : (
                    <p className="text-gray-500">No hay sprite</p>
                )}
            </div>

            <div className="w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{name}</h2> 
                <div className="flex space-x-2 mt-2">
                    {types.map((typeDetail) => (
                    <span 
                        key={typeDetail.type.name}
                        className="px-3 py-1 text-sm font-semibold rounded-full capitalize text-white"
                    >
                        {typeDetail.type.name}
                    </span>
                    ))}
                </div>
            </div>

            <div className="w-full pt-2">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Habilidades:</h3>
                <ul className="list-disc list-inside space-y-1">
                    {abilities.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="capitalize">{item.ability.name}</span>
                        {item.is_hidden && <span className="text-xs ml-2 text-red-500">(Oculta)</span>}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}