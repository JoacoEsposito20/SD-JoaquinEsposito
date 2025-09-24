import { useState, useEffect } from "react";
type Props = {
    url:string;
};

export default function Selector({url}: Props){
        
    //Defino tipo Usuario para poder almacenar su información. 
    type User = {
        id: number;
        name: string;
        usuario: string;
        email: string;
        phone: string;
        website: string;
    }

    //Defino las variables de estado. 
    const [usuario, setUsuarios] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usuarioSelect, setUsuarioSeleccionado] = useState<User | null>(null)
    

    //Hago la consulta de los usuarios a la API de la Actividad 2. 
    useEffect(() => {
        async function fetchUsers() {
        try {
            const res = await fetch(url);
            const data: any[] = await res.json();
            
            const usuarios: User[] = data.map(apiUser => ({
            id: apiUser.id,
            name: apiUser.name,
            usuario: apiUser.username,
            email: apiUser.email,
            phone: apiUser.phone,
            website: apiUser.website
            }));

            setUsuarios(usuarios);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoading(false);
        }
        }
        fetchUsers();
    }, []);


    //Función para determinar que usuario se selecciono. 
    const handleUsuarioSeleccionado = (userId: number) => {
        const user = usuario.find(u => u.id === userId);
        setUsuarioSeleccionado(user || null);
    };

    return(
        <main className="flex flex-col gap-50 grid grid-rows-1 grid-cols-2 row-start-2 items-center sm:items-start">
        <div className="grid grid-rows-10 grid-cols-1 gap-2">
          {isLoading ? (
            <p>Cargando usuarios...</p>
          ) : (
            usuario.map((user) => (
              <button key={user.id} onClick = {() => handleUsuarioSeleccionado(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
                {user.name}
              </button>
            ))
          )}
        </div>
        <div className="flex flex-col items-center grid grid-rows-16 grid-cols-1 gap-y-2 text-center">
          <h3 className="text-1xl font-bold font-sans">#ID {usuarioSelect ? usuarioSelect.id : ""}</h3>
          <h3 className="text-1xl font-bold font-sans">NOMBRE </h3>
          <h1 className="text-2xl font-bold font-sans">
            {usuarioSelect ? usuarioSelect.name : ""}
          </h1>
          <h3 className="text-1xl font-bold font-sans">USUARIO </h3>
          <h1 className="text-2xl font-bold font-sans">
            {usuarioSelect ? usuarioSelect.usuario : ""}
          </h1>
          <h3 className="text-1xl font-bold font-sans">EMAIL </h3>
          <h1 className="text-2xl font-bold font-sans">
            {usuarioSelect ? usuarioSelect.email : ""}
          </h1>
          <h3 className="text-1xl font-bold font-sans">TELEFONO </h3>
          <h1 className="text-2xl font-bold font-sans">
            {usuarioSelect ? usuarioSelect.phone : ""}
          </h1>
          <h3 className="text-1xl font-bold font-sans">WEBSITE </h3>
          <h1 className="text-2xl font-bold font-sans">
            {usuarioSelect ? usuarioSelect.website : ""}
          </h1>
        </div>
      </main>

    );
}