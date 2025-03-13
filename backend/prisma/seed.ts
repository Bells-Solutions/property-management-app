import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const landlord1 = await prisma.user.create({
    data: {
      email: "landlord1@example.com",
      auth0Id: "auth0|landlord123",
      role: "LANDLORD",
    },
  });

  const landlord2 = await prisma.user.create({
    data: {
      email: "landlord2@example.com",
      auth0Id: "auth0|landlord456",
      role: "LANDLORD",
    },
  });

  const tenant1 = await prisma.user.create({
    data: {
      email: "tenant1@example.com",
      auth0Id: "auth0|tenant123",
      role: "TENANT",
    },
  });

  const tenant2 = await prisma.user.create({
    data: {
      email: "tenant2@example.com",
      auth0Id: "auth0|tenant456",
      role: "TENANT",
    },
  });

  // Create Properties
  const property1 = await prisma.property.create({
    data: {
      ownerId: landlord1.id,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      price: 2000,
      status: "AVAILABLE",
    },
  });

  const property2 = await prisma.property.create({
    data: {
      ownerId: landlord1.id,
      address: "456 Park Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
      price: 2500,
      status: "RENTED",
    },
  });

  const property3 = await prisma.property.create({
    data: {
      ownerId: landlord2.id,
      address: "789 Elm St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
      price: 1800,
      status: "AVAILABLE",
    },
  });

  // Create Leases
  const lease1 = await prisma.lease.create({
    data: {
      propertyId: property2.id,
      tenantId: tenant1.id,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-01-01"),
      monthlyRent: 2500,
      status: "ACTIVE",
      signed: true,
    },
  });

  const lease2 = await prisma.lease.create({
    data: {
      propertyId: property3.id,
      tenantId: tenant2.id,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2025-02-01"),
      monthlyRent: 1800,
      status: "ACTIVE",
      signed: true,
    },
  });

  // Create Transactions
  await prisma.transaction.create({
    data: {
      tenantId: tenant1.id,
      propertyId: property2.id,
      amount: 2500,
      status: "COMPLETED",
    },
  });

  await prisma.transaction.create({
    data: {
      tenantId: tenant2.id,
      propertyId: property3.id,
      amount: 1800,
      status: "PENDING",
    },
  });

  // Create Maintenance Requests
  await prisma.maintenanceRequest.create({
    data: {
      propertyId: property2.id,
      tenantId: tenant1.id,
      description: "Leaky faucet in the kitchen",
      status: "PENDING",
    },
  });

  await prisma.maintenanceRequest.create({
    data: {
      propertyId: property3.id,
      tenantId: tenant2.id,
      description: "Heating system malfunctioning",
      status: "IN_PROGRESS",
    },
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e: Error) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
