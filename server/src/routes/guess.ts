import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  fastify.post('/polls/:pollId/matches/:matchId/guesses', {
    onRequest: [authenticate]
  }, async (request, reply) => {
    const createGuessParams = z.object({
      pollId: z.string(),
      matchId: z.string(),
    })

    const createGuessBody = z.object({
      homeTeamPoints: z.number(),
      awayTeamPoints: z.number(),
    })
    
    const { pollId, matchId } = createGuessParams.parse(request.params)
    const { homeTeamPoints, awayTeamPoints } = createGuessBody.parse(request.body)

    const participant = await prisma.participant.findUnique({
      where: {
        userId_pollId: {
          pollId,
          userId: request.user.sub
        }
      }
    })

    if (!participant) {
      return reply.status(400).send({
        message: "You're not allowed to create this guess."
      })
    }

    const guess = await prisma.guess.findUnique({
      where: {
        participantId_matchId: {
          participantId: participant.id,
          matchId,
        }
      }
    })

    if (guess) {
      return reply.status(400).send({
        message: "You've already sent a guess to this match."
      })
    }

    const match = await prisma.match.findUnique({
      where: {
        id: matchId,
      }
    })

    if (!match) {
      return reply.status(400).send({
        message: "Match not found."
      })
    }

    if (match.date < new Date()) {
      return reply.status(400).send({
        message: "You cannot submit a guess for a match that has already taken place."
      })
    }

    await prisma.guess.create({
      data: {
        matchId,
        participantId: participant.id,
        homeTeamPoints,
        awayTeamPoints,
      }
    })

    return reply.status(201).send()
  })
}
