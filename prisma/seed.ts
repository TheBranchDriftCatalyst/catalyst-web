import { PrismaClient } from '@prisma/client'
import dankSeedRunner from './seed/danki/danki.seed'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  await dankSeedRunner(prisma)

  prisma.user.create({
    data: {
      email: 'djdanielsh@gmail.com',
      name: 'Panda Man'
    }
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
