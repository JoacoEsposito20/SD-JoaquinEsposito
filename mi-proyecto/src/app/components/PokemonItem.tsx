"use client";
import Image from 'next/image'
import Link from 'next/link';

type PokemonProps = {
    name:string
}

export default function PokemonItem({name}:PokemonProps){
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
            </main>
        </Link>
    );
}