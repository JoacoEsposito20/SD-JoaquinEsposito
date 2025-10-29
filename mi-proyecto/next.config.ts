import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // ¡ESTE ES EL DOMINIO QUE FALTA!
        hostname: 'raw.githubusercontent.com', 
        // También puedes agregar 'port: ""' si lo deseas, pero no es estrictamente necesario aquí.
        // pathname: '/**' si quieres restringir rutas específicas.
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
