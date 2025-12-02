import prisma from "@/lib/prisma";

export default async function TestPage() {
  const users = await prisma.users.findMany();
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
