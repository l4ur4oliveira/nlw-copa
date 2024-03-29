# NLW Copa do Mundo ⚽

O projeto foi criado durante o evento na Trilha Ignite e consiste em um sistema de bolão para os jogos da Copa do Mundo 2022.

## 📚 Stack

- Node.js
- Fastify
- Prisma
- React / Next.js / Tailwind CSS
- React Native / Expo

### Init Server and Web

```
npm run dev
```

- Server: `http://localhost:3333/` 
- Web: `http://localhost:3000`

### Init Mobile

```
npx expo start
```

Obs. Windows 10: Caso ocorram problemas para conectar o app, verificar firewall e desabilitá-lo.

## 🔧 Utils

- **Prisma**

Criando migrations, utilizando o Prisma Studio para visualização do BD e populando BD usando uma seed.

```
npx prisma migrate dev
npx prisma studio
npx prisma db seed
```

## 🎲 Schema

![Entity Relationship Diagram](./server/prisma/ERD.svg)
