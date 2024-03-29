import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      avatarUrl: 'https://github.com/l4ur4oliveira.png',
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.match.create({
    data: {
      date: '2022-11-25T14:00:00.716Z',
      homeTeamCountryCode: 'BR',
      awayTeamCountryCode: 'FR',
    }
  })

  await prisma.match.create({
    data: {
      date: '2022-11-25T16:00:00.716Z',
      homeTeamCountryCode: 'DE',
      awayTeamCountryCode: 'AR',

      guesses: {
        create: {
          homeTeamPoints: 2,
          awayTeamPoints: 2,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    }
  })
}

main()
